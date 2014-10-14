/**
 * Created by mattiden on 14.10.14.
 */
var DateObject = require('../../models/date');
var User = require('../../models/user');

module.exports = function(req, res, next){
    DateObject.findById(req.params.id)
        .populate('host')
        .populate('guest')
        .exec(function(err, date){
        if(err){
            return res.send(err)
        }
        res.send(date);
    })
};