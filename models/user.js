var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	facebookid : String,
	facebooktoken : String,

	//TODO
	// activedatepost : object.id, ref dateposts
	// activedate : true ? object.id ref dates
	// previousdates : object.id ref dates
});

module.exports = mongoose.model('User', userSchema);