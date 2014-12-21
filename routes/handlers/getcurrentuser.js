/**
 * Created by mattiden on 25.10.14.
 */
var User = require('../../models/user');
var DateIsBetweenNowAndMidnight = require('./validation/dateisbetweennowandmidnight');

module.exports = function(req, res){
    User.findById(req.user.id)
        .populate('activepost')
        .populate('activedatepost')
        .populate('datehistory')
        .exec(function(err, user){
            if(err){
                return res.send(err);
            }
            if (user.activedatepost && !DateIsBetweenNowAndMidnight(user.activedatepost.datetime)) {
                user.activedatepost = null;
            }
            return res.send(user);
        })
};