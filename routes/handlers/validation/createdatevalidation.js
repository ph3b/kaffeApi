var Datepost = require('../../../models/datepost');
var User = require('../../../models/user');
var DateIsBetweenNowAndMidnight = require('./dateisbetweennowandmidnight');


module.exports = function(req, res, next){
	var passedTimeValidation = false;
	var passedVerifyRequestValidation = false;

	Datepost.findById(req.params.postid)
	.exec(function(err, datepost){
		var datetime = datepost.datetime
		if(err){
			return res.send(err)
		}
		if(datepost.requests.indexOf(String(req.params.reqid)) > -1){
			passedVerifyRequestValidation = true;
		}
		if(DateIsBetweenNowAndMidnight(datetime)){
			passedTimeValidation = true;
		}
		if(passedTimeValidation && passedVerifyRequestValidation){
			return next();
		} else {
			return res.send('Did not pass validation');
		}
	})
	
}