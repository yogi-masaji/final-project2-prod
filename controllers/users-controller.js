const { hash, compare } = require('../helpers/hash');
const { sign, verify } = require('../helpers/jwt');
const { User } = require('../models/index');

class UsersController {
    static async signUp(req, res, next){
        const { email, full_name, username, password, profile_image_url, age, phone_number } = req.body;
        const hashedPassword = hash(password);
        try {
            const user = await User.create(
                {
                    email: email,
                    full_name: full_name,
                    username: username,
                    password: hashedPassword,
                    profile_image_url: profile_image_url,
                    age: age,
                    phone_number: phone_number
                }
            );
            res.status(201).json({
                "user": {
                    "email": user.email,
                    "full_name": user.full_name,
                    "username": user.username,
                    "profile_image_url": user.profile_image_url,
                    "age": user.age,
                    "phone_number": user.phone_number
                }
            });
        } catch (error) {
            next(error);
        }
    }
    static async signIn(req, res, next){
        const { email, password } = req.body;
        try {
            if (!email || !password) throw { name: 'EmailOrPasswordEmpty' };
            const user = await User.findOne({ where: { email } });
            if(!user) throw { name: 'EmailNotFound' };
            if(!compare(password, hash(password))) throw { name: 'WrongPassword' };
            const token = sign({ id: user.id, email: user.email });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
    static async update(req, res, next){
        const { email, full_name, username, profile_image_url, age, phone_number } = req.body;
        const { userId } = req.params;
        try {
            const user = await User.update(
                {
                    email: email,
                    full_name: full_name,
                    username: username,
                    profile_image_url: profile_image_url,
                    age: age,
                    phone_number: phone_number
                },
                {
                    where:{
                        id: userId
                    }
                }
            );
            res.status(200).json({
                "email": email,
                "full_name": full_name,
                "username": username,
                "profile_image_url": profile_image_url,
                "age": age,
                "phone_number": phone_number
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async delete(req, res, next){
        const { userId } = req.params;
        try {
            const user = await User.destroy({ where: { id: userId } });
            res.status(200).json({
                "message": "Your account has been successfully deleted"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UsersController;