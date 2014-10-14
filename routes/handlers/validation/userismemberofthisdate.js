/**
 * Created by mattiden on 14.10.14.
 */
var DateObject = require('../../../models/date');
var User = require('../../../models/user');

module.exports = function(req, res, next){
    DateObject.findById(req.params.id, function(err, dateobject){
        if(!dateobject){
            return res.send('This date does not exist.')
        }
        console.log(String(req.user._id) === String(dateobject.host));
        if(String(req.user._id) === String(dateobject.host) || String(req.user._id) === String(dateobject.guest)){
            console.log('Passed validation')
            return next()
        } else {
            return res.send('You are not part of this date.')
        }
    })
};