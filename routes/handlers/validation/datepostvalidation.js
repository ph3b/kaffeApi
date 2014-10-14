// Validation modules
var validator = require('validator');
var User = require('../../../models/user');
var DateIsBetweenNowAndMidnight = require('./dateisbetweennowandmidnight');

var dateDidPassValidation = false;
var locationDidPassValidation = false;
var messageDidPassValidation = false;
var activePostDidPassValidation = false;

module.exports = function(req, res, next){
	// Date validation
	// ==============================
	// Initialize our compare dates. The time out the moment and midnight this day.

	var userFormTimeInput = req.body.datetime;

	if(DateIsBetweenNowAndMidnight(userFormTimeInput)){
		dateDidPassValidation = true;
	} else {
		return res.send('The date specified is outside of valid range. Please specify a date between now and midnight today.')
	}
	// Form fields validation
	// ==============================
	// Message-field
	var message = req.body.message;
	if(validator.isLength(message, 3, 25) && !validator.isURL(message)){
		locationDidPassValidation = true;
	} else {
		return res.send('Message field must contain between 3 to 16 characters and no urls.')
	}

	// Location-field
	var location = req.body.location;
	if(validator.isLength(location, 3, 25) && !validator.isURL(location)){
		messageDidPassValidation = true;
	} else {
		return res.send('Location field must contain between 3 to 16 characters and no urls.')
	}

	// Check if user already has an active, valid datepost
	// ==============================
	User.findById(req.user._id).populate('activedatepost').exec(function(err, user){
		if(user.activedatepost === null){
			return next();
		} else if(!DateIsBetweenNowAndMidnight(user.activedatepost.datetime)){
			return next();
		} else {
			console.log('Did not pass')
		}
		
	})
}