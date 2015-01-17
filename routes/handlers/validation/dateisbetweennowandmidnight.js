var moment = require('moment');

var now = moment();
var midnight = moment();
midnight.hours(23);
midnight.minutes(59);
console.log(now)
module.exports = function(_datetime){
	var datetime = moment(_datetime)
	if(datetime.isAfter(now) && datetime.isBefore(midnight)){
		return true
	}
	return false;

};