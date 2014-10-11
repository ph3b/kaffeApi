var moment = require('moment');
var validator = require('validator');
moment().format();

module.exports = function(req, res, next){
	// Date validation
	// Initialize our compare dates. The time out the moment and midnight this day.
	var now = moment();
	var midnight = moment();
	midnight.hours(23);
	midnight.minutes(59);

	var userInput = moment(req.body.datetime); // Grabs the datetime field from the request body.

	if(userInput.isAfter(now) && userInput.isBefore(midnight)){
		return next();
	} else {
		res.send('The date specified is outside valid range. Please specify a date between now and midnight today.')
	}

	//Form field validation

	//Message-field

}