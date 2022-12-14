const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hash } = require('../helpers/hash');
const { sign, verify } = require('../helpers/jwt');
const { post } = require('../routes');

const user = {
    email: 'user12@mail.com',
    full_name: 'User 12',
    username: 'User12',
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
    const hashedUser = { ...user };
    hashedUser.password = hash(hashedUser.password);
    await queryInterface.bulkInsert('Users', [hashedUser]);
  });

afterAll(async () => {
    sequelize.close();
});


describe('POST /users/login', () => {

    test('Should return HTTP code 200 and JWT when sign in success', async () => {
        const {_body} = await request(app)
        .post('/users/login')
        .send({
            email: user.email,
            password: user.password
        })
        .expect(200);
        const { token } = _body;
        expect(token).toBeTruthy();
        expect(token).toBeDefined();
        expect(token).toEqual(expect.anything());
        const claim = verify(token);
        expect(claim).toEqual({ id: 1, email: user.email, iat: expect.any(Number) });
    });

    test('Should return HTTP code 401 when email is empty string', async() =>{
        const {_body} = await request(app)
        .post('/users/login')
        .send({
            email: "",
            password: user.password
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/wrong email\/password/i);
    });

    test('Should return HTTP code 401 when passowrd is empty string', async() =>{
        const {_body} = await request(app)
        .post('/users/login')
        .send({
            email: user.email,
            password: ""
        })
        .expect(401);
        const {message} = _body;
        expect(message).toBeTruthy();
        expect(message).toBeDefined();
        expect(message).toEqual(expect.anything());
        expect(message).toMatch(/wrong email\/password/i);
    });
});
