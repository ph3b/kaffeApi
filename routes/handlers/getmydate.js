/**
 * Created by mattiden on 14.10.14.
 */
var DateObject = require('../../models/date');
var User = require('../../models/user');

module.exports = function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
            return res.send(err);
        }
        // User has no date. Return 0. Because.
        if(user.activedate === null){
            return res.send('0');
        }
        DateObject.findById(user.activedate)
            .populate('host')
            .populate('guest')
            .exec(function(err, dateobject){
                if(!dateobject.active){
                    return res.send('0')
                }
                return res.send(dateobject);
            })
    })
};