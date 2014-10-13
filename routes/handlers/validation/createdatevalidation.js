var Datepost = require('../../../models/datepost');
var User = require('../../../models/user');
var moment = require('moment');

module.exports = function(req, res, next){
	var now = new Date();
	var midnight = new Date();
	midnight.setHours(23);
	midnight.setMinutes(59);
	midnight.setSeconds(0);

	var passedTimeValidation = false;
	var passedVerifyRequestValidation = false;

	Datepost.findById(req.params.postid)
	.exec(function(err, datepost){
		var datetime = moment(datepost.datetime)
		if(err){
			return res.send(err)
		}
		if(datepost.requests.indexOf(String(req.params.reqid)) > -1){

			passedVerifyRequestValidation = true;
		}
		if(datetime.isAfter(now) && datetime.isBefore(midnight)){

			passedTimeValidation = true;
		}
		if(passedTimeValidation && passedVerifyRequestValidation){
			return next();
		} else {
			return res.send('Did not pass validation');
		}
	})
	
}