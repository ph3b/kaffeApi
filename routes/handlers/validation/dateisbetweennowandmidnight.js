var moment = require('moment');

var now = moment();
var midnight = moment();
var formInputTime;
midnight.hours(23);
midnight.minutes(59);

module.exports = function(formInputTime){
	this.formInputTime = moment(formInputTime);
	if(this.formInputTime.isAfter(now) && this.formInputTime){
		return true;
	};
	return false;

}