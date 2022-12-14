const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hash } = require('../helpers/hash');
const { sign, verify } = require('../helpers/jwt');
const { post } = require('../routes');

const user = {
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
const user2 = {
    email: 'user2@mail.com',
    full_name: 'User 2',
    username: 'User2',
    password: 'password',
    profile_image_url: 'https://www.pexels.com/search/animal/',
    age: 22,
    phone_number: 1231232,
    createdAt: new Date(),
    updatedAt: new Date()
};
const userToken = sign({ id: 1, email: user.email });

beforeAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    const hashedUser1 = { ...user };
    hashedUser1.password = hash(hashedUser1.password);
    const hashedUser2 = { ...user2 };
    hashedUser2.password = hash(hashedUser2.password);
    await queryInterface.bulkInsert('Users', [hashedUser1, hashedUser2]);
});

afterAll(async () => {
    sequelize.close();
});

describe('PUT /users/:userId', () => {

    test('Should return HTTP code 200 when update user data success', async () => {
        const {_body} = await request(app)
        .put('/users/'+1)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            email: 'user123@mail.com',
            full_name: 'User 123',
            username: 'User123',
            profile_image_url: 'https://www.pexels.com/search/animal/',
            age: 22,
            phone_number: 1231232
        })
        .expect(200);
        expect(_body).toBeTruthy();
        expect(_body).toBeDefined();
        expect(_body).toEqual(expect.anything());
        expect(_body.email).toBe('user123@mail.com');
        expect(_body.full_name).toBe('User 123');
        expect(_body.username).toBe('User123');
        expect(_body.profile_image_url).toBe('https://www.pexels.com/search/animal/');
        expect(_body.age).toBe(22);
        expect(_body.phone_number).toBe(1231232);
    });

    test('Should return HTTP code 401 when update user data without JWT', async() => {
        const {_body} = await request(app)
        .put('/users/'+1)
        .send({
            email: 'user123@mail.com',
            full_name: 'User 123',
            username: 'User123',
            profile_image_url: 'https://www.pexels.com/search/animal/',
            age: 22,
            phone_number: 1231232
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/unauthorized/i);
    });

    test('Should return HTTP code 401 when update other user data', async() => {
        const {_body} = await request(app)
        .put('/users/'+2)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
            email: 'user123@mail.com',
            full_name: 'User 123',
            username: 'User123',
            profile_image_url: 'https://www.pexels.com/search/animal/',
            age: 22,
            phone_number: 1231232
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/unauthorized/i);
    });
});