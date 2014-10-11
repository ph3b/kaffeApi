// Required route handlers.
var getDatePosts = require('./handlers/getdateposts');
var addDatePost = require('./handlers/adddatepost');
var getUsers = require('./handlers/getusers');
var getUserById = require('./handlers/getuserbyid');
var updateBio = require('./handlers/updatebio');

// Required validation handlers
var datePostValidation = require('./handlers/validation/datepostvalidation');

// Config for our front-end app.
var frontend = require('../config/frontend');
var baseFront = frontend.appBase;

module.exports = function(app, passport){
    // Facebook authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

    app.get('/auth/facebook/callback',
    	passport.authenticate('facebook', {
    		successRedirect : baseFront + 'feed',
    		failureRedirect : '/failure'
    	})
    );

    // Api routes
    app.get('/api/dateposts', isLoggedIn, getDatePosts); 		// Returns all dateposts.
    
    app.post('/api/dateposts/', isLoggedIn, datePostValidation, addDatePost); 		// Adds datepost.

    app.get('/api/isloggedin', function(req, res){				// Returns if user is logged in. Used by route restriction in angular.
    	res.send(req.isAuthenticated() ? req.user : '0')
    })
    app.get('/api/users', isLoggedIn, getUsers); 				// Returns all user. Need to restrict.
    
    app.get('/api/currentuser', isLoggedIn, function(req, res){ // Get current user NB: This returns fb-token, should strip this field.
    	res.send(req.user);
    })
    app.get('/api/user/:id', isLoggedIn, getUserById); 			// Get user by their ID. Strips private fields.

    app.put('/api/user', isLoggedIn, updateBio); 				// Update bio.

};
	// Server side authentication check for route restriction.
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.send('User is not logged in.')
	}
};
