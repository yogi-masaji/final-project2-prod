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
    
    static async delete(req, res, next) {
        const socialMediaID = req.params.socialMediaId;
        try {
            const socialmedia = await SocialMedia.destroy({ where: { id: socialMediaID } });
            res.status(200).json({ "message": "your social Media has been successfully deleted" })
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const socialMediaID = req.params.socialMediaId;
        const {name, social_media_url} = req.body;
        try {
            const socialmedia = await SocialMedia.update({ name, social_media_url }, { where: { id: socialMediaID }, returning: true });
            res.status(200).json({ "socialmedia" : socialmedia[1][0]})
        } catch (err) {
            next(err)
        }
    }

}

module.exports = SocialmediasController;