var datePost = require('../../models/datepost');

module.exports = function(req, res){
	datePost.find(function(err, datePosts){
		if(err){
			res.send(err);
		}
		res.json(datePosts);
	})
}