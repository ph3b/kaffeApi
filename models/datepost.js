var mongoose = require('mongoose');
var User = require('./user');


var datepostSchema = mongoose.Schema({
	poster : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	datetime : Date,
	location : String,
	message : String,
	requests : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	active: Boolean
})

module.exports = mongoose.model('Datepost', datepostSchema);