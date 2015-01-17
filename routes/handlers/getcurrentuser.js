/**
 * Created by mattiden on 25.10.14.
 */
var User = require('../../models/user');
module.exports = function(req, res){
    User.findById(req.user.id)
        .populate('activepost')
        .populate('activedatepost')
        .populate('datehistory')
        .exec(function(err, user){
            if(err){
                return res.send(err);
            }
            return res.send(user);
        })
};