'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Photo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Comment, {
                foreignKey: 'PhotoId'
            });
            this.belongsTo(models.User, {
                foreignKey: 'UserId'
            })
        }
    }
    Photo.init(
        {
            title: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty:{
                        args: true,
                        msg: "Title  tidak boleh kosong"
                    }
                }
            },
            caption: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty:{
                        args: true,
                        msg: "Caption tidak boleh kosong"
                    }
                }
            },
            poster_image_url: { 
                type: DataTypes.TEXT,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Profile Image URL tidak boleh kosong"
                    },
                    isUrl: true
                }
            },
            UserId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Photo',
        }
    );
    return Photo;
};
