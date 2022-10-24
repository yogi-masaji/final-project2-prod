const {SocialMedia, User} = require('../models/index');

class SocialmediasController {
    static async create(req, res, next) {
        const UserId = req.user.id;
        const {name, social_media_url} = req.body;
        try {
            const socialMedia = await SocialMedia.create({
                name,
                social_media_url,
                UserId,
            });
            res.status(201).json({
                "id": socialMedia.id,
                "name": socialMedia.name,
                "social_media_url": socialMedia.social_media_url,
                "UserId": socialMedia.UserId
            })
        } catch (err) {
            next(err)
        }
    }

    static async getAll(req, res, next) {
        try {
            const socialMedias = await SocialMedia.findAll({
                include: {
                    model: User,
                    attributes: ['id', 'username', 'profile_image_url']
                }
            });
            res.status(200).json({
                "socialMedias": socialMedias
            })
        } catch (err) {
            next(err)
        }
    }
    
    
}

module.exports = SocialmediasController;