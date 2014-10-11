var User = require('../../models/user');
var moment = require('moment');

module.exports = function(req, res){
	User.findById(req.user._id).populate('activedatepost').exec(function(err, user){
		if(user.activedatepost === null){
			return res.send('0')
		}
		var datepostTime = moment(user.activedatepost.datetime);
		var now = moment();
		var midnight = moment();
		midnight.hours(23);
		midnight.minutes(59);
		if(datepostTime.isAfter(now) && datepostTime.isBefore(midnight)){
			res.send(user.activedatepost);
		} else {
			res.send('0');
		}
	})
}