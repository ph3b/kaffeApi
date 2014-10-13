var User = require('../../models/user');
var DateObject = require('../../models/date');
var Datepost = require('../../models/user');

module.exports = function(req, res){
	Datepost.findById(req.params.postid, function(err, datepost){
		/*var newDateObject = new DateObject();
		newDateObject.datetime = datepost.datetime;
		newDateObject.message = datepost.message;
		newDateObject.location = datepost.location;
		newDateObject.host = datepost.poster;
		newDateObject.guest = req.params.reqid;

		newDateObject.save(function(err){
			User.findById(req.user._id, function(err, user){
			if(err){
				res.send(err)
			}
			// When the date is created set active datepost to null
			user.activedatepost = null;
			User.save(function(err){
				if(err){
					res.send(err)
				}
			})
		})
		// Check is the guest has an active datepost. In which case we set it to inactive
		User.findById(req.params.reqid).populate('activedatepost')
		.exec(function(err, user){
			if(user.activedatepost != null){
				user.activedatepost = null;
				user.save(function(err, user){
					if(err){
						res.send(err)
					}
				})
			}
		})

		// We also need to remove any requests sent to other dateposts from the host and the guest
		// since the two won't be needing them. They can resend a request after the date if they want.
		*/
		Datepost.find({ 'requests' : req.user._id}, function(err, datepost){
			console.log(datepost)
		})

		})
		

		


	/*}) */
}