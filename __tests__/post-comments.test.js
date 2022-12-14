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
const defaultComment = {
    comment : 'komen',
    PhotoId: 1
}
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

describe('POST /comments', () => {
    test('Should return HTTP code 201 when create comment success', async () => {
        const { _body } = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            comment: defaultComment.comment,
            PhotoId: defaultComment.PhotoId
        })
        .expect(201);
        expect(_body).toBeTruthy();
        expect(_body).toBeDefined();
        expect(_body).toEqual({
            id: expect.anything(),
            comment: defaultComment.comment,
            PhotoId: defaultComment.PhotoId,
            UserId: expect.anything()
        });
    });
});
