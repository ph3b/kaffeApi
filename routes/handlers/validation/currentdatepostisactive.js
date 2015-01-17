/**
 * Created by mattiden on 16.01.15.
 */
var moment = require('moment');

var now = moment(new Date());
var midnight = moment();
midnight.hours(23);
midnight.minutes(59);

module.exports = function(_datetime){
    var datetime = moment(_datetime)
    console.log("Now: " + now.date() + " " + now.hour() + " " + now.minutes())
    console.log("Datetime: " + datetime.date() + " " + datetime.hour() + " " + datetime.minutes())
    if(now.isAfter(datetime)){
        return false
    }
    return true;

};