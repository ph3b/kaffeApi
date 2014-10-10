var datePost = require('../../models/datepost');

module.exports = function(req, res){
	datePost.find().populate('poster', 'firstname lastname facebookid').exec(function(err, datepost){
		if(err){
			res.send(err)
		}
		res.send(datepost);
	})
}