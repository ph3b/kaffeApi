var datePost = require('../../models/datepost');

module.exports = function(req, res){
	
	var newDatePost = new datePost();

	newDatePost.poster = req.user._id;
	newDatePost.datetime = req.body.datetime;
	newDatePost.location = req.body.location;
	newDatePost.message = req.body.message;
	newDatePost.active = true;

	newDatePost.save(function(err){
		if(err){
			res.send(err);
		} else {
			res.send('Saved');
		}
	})
}