var Datepost = require('../../models/datepost');
var User = require('../../models/user');

module.exports = function(req, res){
	Datepost.findById(req.params.id, function(err, datepost){
		if(err){
			res.send(err);
		}
		if(datepost.requests.indexOf(req.user._id) > -1){
			return res.send('User already sent request');
		}
		if(datepost.poster == req.user._id){
			return res.send('You cannot send requests to yourself')
		}
		datepost.requests.push(req.user._id);
		datepost.save(function(err){
			if(err){
				res.send(err);
			}
			res.send('Request sent');
		})
	})
}