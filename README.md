# final-project-2

**Setup Local**

1. Rubah config pada `config/config.js` sesuaikan username dan password untuk postgres nya.
2. Jalankan command `npm install`
3. Jalankan command `npx sequelize-cli db:create` untuk membuat database.
4. Lalu command `npx sequelize-cli db:migrate` untuk membuat tabel.
5. `npm run dev` untuk menjalankan aplikasi

**Authorization:**

-file middlewares/authorization-middleware.js

-ada 4 function authorization: user, photo, comment, socialmedia

-cara pakai (Contoh)
1. `const {authorizationUser} = require('../middlewares/authorization-middleware');` Untuk import
2. `router.use('/:userId', authorizationUser);` untuk route

**List Endpoint:**
1. POST `user/register`
dengan request body email, full_name, username, password, profile_image_url, age, phone_number
2. POST `user/login`
request body email, password
3. PUT `user/:id` 
dengan request body email, full_name, username, profile_image_url, age, phone_number
4. DELETE `user/:id`

5. POST `/photos`
dengan request body `poster_image_url, title, caption`
6. GET `/photos`
7. PUT `photos/:id` 
dengan request body `poster_image_url, title, caption`
8. DELETE `photos/:id`

9. POST `/comments`
dengan request body `comment, PhotoId`
10. GET `/comments`
11. PUT `comments/:id` 
dengan request body `comment, PhotoId`
12. DELETE `comments/:id`

13. POST `/socialmedias`
dengan request body `name, social_media_url`
14. GET `/socialmedias`
15. put `/socialmedias/:id`
dengan request body `name, social_media_url`
16. GET `/socialmedias/:id`