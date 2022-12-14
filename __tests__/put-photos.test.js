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
const updatePhoto = {
    title: 'Insert Photo',
    caption: 'Insert Photo caption',
    poster_image_url: 'http://image.com/insertphoto.png'
};
const defaultPhoto = {
    title: 'Default Photo',
    caption: 'Default Photo caption',
    poster_image_url: 'http://image.com/defaultphoto.png',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
};
const defaultPhoto2 = {
    title: 'Default Photo2',
    caption: 'Default Photo caption2',
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
    await queryInterface.bulkInsert('Photos', [defaultPhoto, defaultPhoto2]);
});

const userToken = sign({ id: 1, email: userTest.email });
afterAll(async () => {
    sequelize.close();
});

describe('PUT /photos/:photoId', () => {
    test('Should return HTTP code 200 when update user data photo', async() => {
        const { _body } = await request(app)
        .put('/photos/'+1)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            poster_image_url: updatePhoto.poster_image_url,
            title: updatePhoto.title,
            caption: updatePhoto.caption
        })
        .expect(200);
        const { photo } = _body;
        expect(photo).toBeTruthy();
        expect(photo).toBeDefined();
        expect(photo).toEqual({
            id: expect.anything(),
            title: updatePhoto.title,
            caption: updatePhoto.caption,
            poster_image_url: updatePhoto.poster_image_url,
            UserId: expect.anything(),
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
        });
    });

    test('Should return HTTP code 400 when update photo with wrong format poster image url', async() => {
        const { _body } = await request(app)
        .put('/photos/'+1)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            poster_image_url: "Wrong Format",
            title: updatePhoto.title,
            caption: updatePhoto.caption
        })
        .expect(400);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message[0]).toBe('Validation isUrl on poster_image_url failed');
    });

    test('Should return HTTP code 401 when update photo data without JWT', async() => {
        const { _body } = await request(app)
        .put('/photos/'+1)
        .send({
            poster_image_url: updatePhoto.poster_image_url,
            title: updatePhoto.title,
            caption: updatePhoto.caption
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/unauthorized/i);
    });

    test('Should return HTTP code 401 when update photo data without exist JWT', async() => {
        const { _body } = await request(app)
        .put('/photos/'+1)
        .set('Authorization', `Bearer Wrong Token`)
        .send({
            poster_image_url: updatePhoto.poster_image_url,
            title: updatePhoto.title,
            caption: updatePhoto.caption
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/invalid token/i);
    });
});