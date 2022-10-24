'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SocialMedia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'UserId'
            })
        }
    }
    SocialMedia.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Name tidak boleh kosong',
                    },
                },
            },
            social_media_url: {
                type: DataTypes.TEXT,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: 'Social Media URL tidak boleh kosong',
                    },
                    isUrl: true,
                },
            },
            UserId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'SocialMedia',
        }
    );
    return SocialMedia;
};
