var datePost = require('../../models/datepost');
var User = require('../../models/user');

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
			User.findById(req.user._id, function(err, user){
				if(err){
					res.send(err)
				}
				user.activedatepost = newDatePost._id;
				user.save(function(err){
					if(err){
						res.send(err)
					}
				})
			})
			res.send('Saved');
		}
	})
}