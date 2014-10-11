var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	facebookid : String,
	facebooktoken : String,
	bio: { type: String, default: null},
	activedatepost : { type: mongoose.Schema.Types.ObjectId, ref: 'Datepost' , default: null}

	//TODO
	// activedate : true ? object.id ref dates
	// previousdates : object.id ref dates
});

module.exports = mongoose.model('User', userSchema);