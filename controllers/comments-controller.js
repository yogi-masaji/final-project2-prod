const { Photo, Comment, User} = require('../models/index');

class CommentsController{
    static async create(req, res, next){
        const {comment, PhotoId} = req.body;
        const UserId = req.user.id
        try {
            const com = await Comment.create({
                comment,
                PhotoId,
                UserId
            });
            res.status(201).json({
                "comment": com
            })
        }catch(err){
            next(err)
        }
    }

    static async getAll(req, res, next){
        try{
            const comments = await Comment.findAll({
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'title', 'caption', 'poster_image_url']
                    },
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url', 'phone_number']
                    }
                ]
            });
            res.status(200).json({
                "comments": comments
            })
        }catch(err){
            next(err)
        }
    }

    static async update(req, res, next){
        const {comment} = req.body;
        const commentID = req.params.commentId;
        try{
            const com = await Comment.update(
                {
                    comment
                }, 
                {
                    where:{
                        id: commentID
                    },
                    returning: true,
                    plain: true
                }
            );
            res.status(200).json({
                "comment": com[1]
            })
        }catch(err){
            next(err)
        }
    }

    static async delete(req, res, next){
        const commentID = req.params.commentId;
        try{
            const comment = await Comment.destroy({ where: {id: commentID}});
            res.status(200).json({
                "message": "Your comment has been successfully deleted"
            });
        }catch(err){
            next(err)
        }
    }
}
module.exports = CommentsController;