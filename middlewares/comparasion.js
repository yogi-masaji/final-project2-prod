async function authorizationSocialMedia(req, res, next){
    const { socialMediaId } = req.params;
    const authUser = req.user.id;
    try {
        const socialmedia = SocialMedia.findOne({ where : { id: socialMediaId } });
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