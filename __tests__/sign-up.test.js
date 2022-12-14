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
    phone_number: 1231232,
    // createdAt: new Date(),
    // updatedAt: new Date()
};

beforeAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
    const hashedUser = { ...userTest };
    hashedUser.password = hash(hashedUser.password);
    // await queryInterface.bulkInsert('Users', [hashedUser]);
});
  
afterAll(async () => {
    sequelize.close();
});


describe('POST /users/register', () => {
    test('Should return HTTP code 201 when sign up success', async () => {
        const { _body } = await request(app)
        .post('/users/register')
        .send({
            email: userTest.email,
            full_name: userTest.full_name,
            username: userTest.username,
            password: userTest.password,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        })
        .expect(201);
        const { user } = _body;
        expect(user).toBeTruthy();
        expect(user).toEqual({
            email: userTest.email,
            full_name: userTest.full_name,
            username: userTest.username,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        });
        expect(user).toBeDefined();
        expect(user).toStrictEqual({
            email: userTest.email,
            full_name: userTest.full_name,
            username: userTest.username,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        });
    });

    test('Should return HTTP code 400 when sign up with empty string email', async () => {
        const {_body} = await request(app)
        .post('/users/register')
        .send({
            email: "",
            full_name: userTest.full_name,
            username: userTest.username,
            password: userTest.password,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        })
        .expect(400);
        const { message } = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toEqual(expect.arrayContaining(['Email tidak boleh kosong']));
        expect(message).toEqual(expect.arrayContaining(['Validation isEmail on email failed']));
    });

    test('Should return HTTP code 400 when sign up with wrong format email', async () => {
        const {_body} = await request(app)
        .post('/users/register')
        .send({
            email: "Not Email",
            full_name: userTest.full_name,
            username: userTest.username,
            password: userTest.password,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        })
        .expect(400);
        const { message } = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toEqual(expect.arrayContaining(['Validation isEmail on email failed']));
    });

    test('Should return HTTP code 400 when sign up with empty full name', async() => {
        const {_body} = await request(app)
        .post('/users/register')
        .send({
            email: userTest.email,
            full_name: "",
            username: userTest.username,
            password: userTest.password,
            profile_image_url: userTest.profile_image_url,
            age: userTest.age,
            phone_number: userTest.phone_number
        })
        .expect(400);
        const { message } = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toEqual(expect.arrayContaining(['Full Name tidak boleh kosong']));
    });
});
