'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Photo, {
                foreignKey: 'PhotoId'
            });
            this.belongsTo(models.User, {
                foreignKey: 'UserId'
            })
        }
    }
    Comment.init(
        {
            UserId: DataTypes.INTEGER,
            PhotoId: DataTypes.INTEGER,
            comment: {
                type: DataTypes.TEXT,
                validate: {
                    notEmpty: {
                        args: true,
                        msg: "Comment tidak boleh kosong"
                    },
                }
            },
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};
