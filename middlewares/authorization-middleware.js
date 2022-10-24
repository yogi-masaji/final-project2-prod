const { User, Photo, Comment, SocialMedia } = require('../models/index');

async function authorizationUser(req, res, next){
    const { userId } = req.params;
    const authUser = req.user.id;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if(!user) throw { name: 'ErrNotFound' };
        if(user.id === authUser){
            return next();
        }else{
            throw { name: 'Unauthorized' };
        }
    } catch (error) {
        next(error);
    }
}
async function authorizationPhoto(req, res, next){
    const { photoId } = req.params;
    const authUser = req.user.id;
    try {
        const photo = await Photo.findOne({ where: { id: photoId } });
        if(!photo) throw { name: 'ErrNotFound'};
        if(photo.UserId === authUser){
            return next();
        }else{
            throw { name: 'Unauthorized' };
        }
    } catch (error) {
        next(error);
    }
}
async function authorizationComment(req, res, next){
    const { commentId } = req.params;
    const authUser = req.user.id;
    try {
        const comment = await Comment.findOne({ where : { id: commentId } });
        if(!comment) throw { name: 'ErrNotFound'};
        if(comment.UserId === authUser){
            return next();
        }else{
            throw { name: 'Unauthorized' };
        }
    } catch (error) {
        next(error);
    }
}

async function authorizationSocialMedia(req, res, next){
    const { socialMediaId } = req.params;
    const authUser = req.user.id;
    try {
        const socialmedia = await SocialMedia.findOne({ where : { id: socialMediaId } });
        if(!socialmedia) throw { name: 'ErrNotFound'};
        if(socialmedia.UserId === authUser){
            return next();
        }else{
            throw { name: 'Unauthorized' };
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authorizationPhoto,
    authorizationUser,
    authorizationComment,
    authorizationSocialMedia
};