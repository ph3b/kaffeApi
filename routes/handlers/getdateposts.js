var datePost = require('../../models/datepost');

module.exports = function(req, res){
	// Initialize compare objects
	var now = new Date();
	var midnight = new Date();
	midnight.setHours(23);
	midnight.setMinutes(59);
	midnight.setSeconds(0);

	// Get posts where datetime field is a date between now and midnight
	datePost.find({'datetime': {'$gte': now, '$lte' : midnight}}).populate('poster', 'firstname lastname facebookid').exec(function(err, datepost){
		if(err){
			res.send(err)
		}
		res.send(datepost);
	})
}