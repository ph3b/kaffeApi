var User = require('../../models/user');
var DateObject = require('../../models/date');
var Datepost = require('../../models/datepost');

module.exports = function(req, res){
	Datepost.findById(req.params.postid, function(err, datepost){
		var newDateObject = new DateObject();
		newDateObject.datetime = datepost.datetime;
		newDateObject.message = datepost.message;
		newDateObject.location = datepost.location;
		newDateObject.host = datepost.poster;
		newDateObject.guest = req.params.reqid;

		newDateObject.save(function(err, date){
			// Set host and guest's activedatepost to null
			// =============================================
			User.findById(req.user._id).populate('activedatepost').exec(function(err, user){
				if(err){
					return res.send(err)
				}
				// When the date is created set active datepost to null
				user.activedate = date._id;
				user.activedatepost.active = false;

				user.activedatepost.save(function(err){
					if(err){
						res.send(err);
					}
				});

				user.activedatepost = null;
				user.save(function(err){
					if(err){
						res.send(err)
					}
				})

			})
			// Set the guest activepost to null and add pointer the the new activedate.
			User.findById(req.params.reqid).populate('activedatepost')
			.exec(function(err, user){
				user.activedate = date._id;
				if(user.activedatepost){
					user.activedatepost.active = false;
					user.activedatepost.save(function(err){
						if(err){
							res.send(err)
						}
					})
					user.activedatepost = null;
				}
				user.save(function(err, user){
					if(err){
						res.send(err)
					}
				})
				
			})

			// We also need to remove any requests sent to other dateposts from the host and the guest
			// since the two won't be needing them. They can resend a request after the date if they want.
			// =============================================
			Datepost.find({ 'requests' : req.user._id}, function(err, datepost){
				for(var i = 0; i < datepost.length; i++){
					var currentRequestList = datepost[i].requests;
					var indexOfRequest = currentRequestList.indexOf(req.user._id)
					currentRequestList.splice(indexOfRequest, 1);
					datepost[i].save(function(err){
						if(err){
							res.send(err)
						}
					})
				}
			})
			Datepost.find({ 'requests' : req.params.reqid}, function(err, datepost){
				for(var i = 0; i < datepost.length; i++){
					var currentRequestList = datepost[i].requests;
					var indexOfRequest = currentRequestList.indexOf(req.params.reqid)
					currentRequestList.splice(indexOfRequest, 1);
					datepost[i].save(function(err){
						if(err){
							res.send(err)
						}
					})
				}
			})
		res.send(date)
		})

	}) 
}