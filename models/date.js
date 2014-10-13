var mongoose = require('mongoose');
var User = require('./user');


var dateSchema = mongoose.Schema({
	datetime : Date,
	location : String,
	message : String,
	active: { type: Boolean, default: true},
	host: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	guest : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Date', dateSchema);