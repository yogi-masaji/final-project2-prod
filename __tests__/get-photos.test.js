const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hash } = require('../helpers/hash');
const { sign, verify } = require('../helpers/jwt');
const { post } = require('../routes');

const userTest = {
    email: 'user1@mail.com',
    full_name: 'User 1',
    username: 'User1',
    password: 'password',
    profile_image_url: 'https://www.pexels.com/search/animal/',
    age: 21,
    phone_number: 1231231,
    createdAt: new Date(),
    updatedAt: new Date()
};
const defaultPhoto = {
    title: 'Default Photo',
    caption: 'Default Photo caption',
    poster_image_url: 'http://image.com/defaultphoto.png',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
beforeAll(async () => {
    await queryInterface.bulkDelete('Photos', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    const hashedUser = { ...userTest };
    hashedUser.password = hash(hashedUser.password);
    await queryInterface.bulkInsert('Users', [hashedUser]);
    await queryInterface.bulkInsert('Photos', [defaultPhoto]);
});

const userToken = sign({ id: 1, email: userTest.email });
afterAll(async () => {
    sequelize.close();
});


describe('GET /photos', () => {
    test('Should return HTTP code 200 when get photos success', async () => {
        const { _body } = await request(app)
        .get('/photos')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
        const { photos } = _body;
        expect(photos).toBeTruthy();
        expect(photos).toBeDefined();
        expect(photos.length).toBe(1);
        expect(photos[0]).toEqual({
            id: expect.anything(),
            title: defaultPhoto.title,
            caption: defaultPhoto.caption,
            poster_image_url: defaultPhoto.poster_image_url,
            UserId: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
            Comments: expect.anything(),
            User: expect.anything()
        });
    });

    test('Should return HTTP code 401 when get photo data without JWT', async() => {
        const { _body } = await request(app)
        .get('/photos')
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/unauthorized/i);
    });

    test('Should return HTTP code 401 when get photo data without exist JWT', async() => {
        const { _body } = await request(app)
        .get('/photos')
        .set('Authorization', `Bearer Wrong Token`)
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/invalid token/i);
    });
});
