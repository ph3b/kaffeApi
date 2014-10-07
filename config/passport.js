var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../models/user');

module.exports = function(passport){
	// Serializing and deserializing user sessions
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		})
	});

	// Facebook login/signup strategy
	passport.use(new FacebookStrategy({
		clientID 		: configAuth.clientID,
		clientSecret 	: configAuth.clientSecret,
		callbackURL		: configAuth.callbackURL
	},
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			User.findOne({ 'facebookid' : profile.id}, function(err, user){
				if(err){
					return done(err);
				}
				if(user){
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.facebookid = profile.id;
					newUser.facebooktoken = token;
					newUser.firstname = profile.name.givenName;
					newUser.lastname = profile.name.familyName;
					newUser.email = profile.emails[0].value;

					newUser.save(function(err){
						if(err){
							throw(err);
						}
						return done(null, newUser);
					})
				}
			})
		})
	}

	))

}