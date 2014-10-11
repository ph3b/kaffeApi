// Validation modules
var moment = require('moment');
var validator = require('validator');
var User = require('../../../models/user');
moment().format();

module.exports = function(req, res, next){
	var dateDidPass = false;
	var locationDidPass = false;
	var messageDidPass = false;
	var activePostDidPass = false;
	// Date validation
	// ==============================
	// Initialize our compare dates. The time out the moment and midnight this day.
	var now = moment();
	var midnight = moment();
	midnight.hours(23);
	midnight.minutes(59);

	var userInput = moment(req.body.datetime);

	if(userInput.isAfter(now) && userInput.isBefore(midnight)){
		dateDidPass = true;
	} else {
		return res.send('The date specified is outside of valid range. Please specify a date between now and midnight today.')
	}
	// Form field validation
	// ==============================
	// Message-field
	var message = req.body.message;
	if(validator.isLength(message, 3, 16) && !validator.isURL(message)){
		locationDidPass = true;
	} else {
		return res.send('Message field must contain between 3 to 16 characters and no urls.')
	}

	// Location-field
	var location = req.body.location;
	if(validator.isLength(location, 3, 16) && !validator.isURL(location)){
		messageDidPass = true;
	} else {
		return res.send('Location field must contain between 3 to 16 characters and no urls.')
	}

	// Check if user already has an active, valid datepost
	// This code is really bad
	User.findById(req.user._id).populate('activedatepost').exec(function(err, user){
		if(user.activedatepost === null){
			return next();
		} else {
			var existingDatePostTime = moment(user.activedatepost.datetime);
			if(existingDatePostTime.isAfter(now) && existingDatePostTime.isBefore(midnight)){
				return res.send('User already has an active datepost.');
			} else {
				return next();
			}
		}
	})
}