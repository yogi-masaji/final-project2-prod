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
1. `const authorizationUser = require('../middlewares/authorization-middleware');` Untuk import
2. `router.use('/:userId', authorizationUser);` untuk route

**List Endpoint:**
1. POST `user/register`
dengan request body email, full_name, username, password, profile_image_url, age, phone_number
2. POST `user/login`
request body email, password
3. PUT `user/:id` 
dengan request body email, full_name, username, profile_image_url, age, phone_number
4. DELETE `user/:id`
