const { Photo, Comment, User} = require('../models/index');

class PhotosController{
    static async create(req, res, next){
        const UserId = req.user.id
        const {poster_image_url, title, caption} = req.body;
        try{
            const photo = await Photo.create({
                poster_image_url,
                title,
                caption,
                UserId
            });
            res.status(201).json({
                "id": photo.id,
                "poster_image_url": photo.poster_image_url,
                "title": photo.title,
                "caption": photo.caption,
                "UserId": photo.UserId
            })
        }catch(err){
            next(err)
        }
    }

    static async getAll(req, res, next){
        try{
            const photos = await Photo.findAll({
                include: [
                    {
                        model: Comment,
                        attributes: ['comment'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['id', 'username', 'profile_image_url']
                    }
                ]
            });
            res.status(200).json({
                "photos": photos
            })
        }catch(err){
            next(err)
        }
    }

    static async update(req, res, next){
        const {title,caption, poster_image_url} = req.body;
        const photoID = req.params.photoId;
        try{
            const photo = await Photo.update({
                title,
                caption,
                poster_image_url
            },
            {
                where:{
                    id: photoID
                },
                returning: true,
                plain: true
            });
            res.status(200).json({
                "photo": photo[1]
            })
        }catch(err){
            next(err)
        }
    }
    static async delete(req, res, next){
        const photoID = req.params.photoId;
        try{
            const photo = await Photo.destroy({ where: { id: photoID}});
            res.status(200).json({
                "message": "Your photo has been successfully deleted"
            });
        }catch(err){
            next(err)
        }
    }
}

module.exports = PhotosController;