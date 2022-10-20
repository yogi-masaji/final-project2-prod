const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            full_name: {
                type: DataTypes.STRING,
                validate:{
                    notEmpty: {
                        args: true,
                        msg: "Full Name tidak boleh kosong"
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: "Email ini sudah digunakan"
                },
                validate: {
                    isEmail: true,
                    notEmpty: {
                        args: true,
                        msg: "Email tidak boleh kosong"
                    }
                }
            },
            username: {
                type: DataTypes.STRING,
                validate:{
                    notEmpty: {
                        args: true,
                        msg: "Username tidak boleh kosong"
                    }
                },
                unique: {
                    args: true,
                    msg: "Username ini sudah digunakan"
                }
            },
            password: {
                type: DataTypes.STRING,
                validate:{
                    notEmpty: {
                        args: true,
                        msg: "Password tidak boleh kosong"
                    }
                }
            },
            profile_image_url:{ 
                type: DataTypes.TEXT,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Profile Image URL tidak boleh kosong"
                    },
                    isUrl: true
                }
            },
            age: {
                type: DataTypes.INTEGER,
                validate:{
                    notEmpty: {
                        args: true,
                        msg: "Age Image URL tidak boleh kosong"
                    },
                    isInt: true,
                    isNumeric: true,

                }
            },
            phone_number: {
                type: DataTypes.INTEGER,
                validate:{
                    notEmpty: {
                        args: true,
                        msg: "Phone Number Image URL tidak boleh kosong"
                    },
                    isInt: true,
                    isNumeric: true,

                }
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
