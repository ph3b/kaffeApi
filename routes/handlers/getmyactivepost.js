// Checks the user for an active datepost, date time assigned on the post has to be within
// now and midnight the same day. Return '0' if no such date is present.

var User = require('../../models/user');
var Datepost = require('../../models/datepost');

module.exports = function(req, res){
	// Initialize compare objects
	var now = new Date();
	var midnight = new Date();
	midnight.setHours(23);
	midnight.setMinutes(59);
	midnight.setSeconds(0);

	Datepost.findOne()
	.where('poster').equals(req.user._id)
	.where('datetime').gte(now).lte(midnight)
	.populate('requests').exec(function(err, datepost){
		if(err){
			res.send(err);
		}
		if(!datepost){
			return  res.send('0')
		}
		return res.send(datepost)
	})
}