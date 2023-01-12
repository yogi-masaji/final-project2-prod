// const request = require('supertest');
// const app = require('../app');
// const { sequelize } = require('../models/index');
// const { queryInterface } = sequelize;
// const { hash } = require('../helpers/hash');
// const { sign, verify } = require('../helpers/jwt');
// const { post } = require('../routes');

// const userTest = {
//     email: 'user1@mail.com',
//     full_name: 'User 1',
//     username: 'User1',
//     password: 'password',
//     profile_image_url: 'https://www.pexels.com/search/animal/',
//     age: 21,
//     phone_number: 1231231,
//     createdAt: new Date(),
//     updatedAt: new Date()
// };

// const defaultComment = {
//     "comment": "komen 3",
//     "PhotoId": 1
// };

// const defaultPhoto = {
//     title: 'Default Photo',
//     caption: 'Default Photo caption',
//     poster_image_url: 'http://image.com/defaultphoto.png',
//     UserId: 1,
//     createdAt: new Date(),
//     updatedAt: new Date()
// };

// beforeAll(async () => {
//     await queryInterface.bulkDelete('Photos', null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true
//     });
//     await queryInterface.bulkDelete('Users', null, {
//       truncate: true,
//       restartIdentity: true,
//       cascade: true
//     });
//     const hashedUser = { ...userTest };
//     hashedUser.password = hash(hashedUser.password);
//     await queryInterface.bulkInsert('Users', [hashedUser]);
//     await queryInterface.bulkInsert('Photos', [defaultPhoto]);
// });