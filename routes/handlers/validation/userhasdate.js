/**
 * Created by mattiden on 17.10.14.
 */
var User = require('./../../../models/user');

module.exports = function(req, res, next){
    User.findById(req.user._id).populate('activedate').exec(function(err, user){
        if(user.activedate){
            if(!user.activedate.active){
                next();
            }
            else {
                return res.send('User already has an active date. Please cancel date to make a new date post.');
            }
        } else {
            return next();
        }

    })
}