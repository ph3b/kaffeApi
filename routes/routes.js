// Required route handlers
var getDatePosts = require('./handlers/getdateposts');
var addDatePost = require('./handlers/adddatepost');
var getUsers = require('./handlers/getusers');
var getUserById = require('./handlers/getuserbyid');
var updateBio = require('./handlers/updatebio');
var getMyActivePost = require('./handlers/getmyactivepost');
var deleteDatePost = require('./handlers/deletedatepost');
var sendRequest = require('./handlers/sendrequest');
var createDate = require('./handlers/createdate');
var getDateById = require('./handlers/getdate');
var endDate = require('./handlers/enddate');
var getMyDate = require('./handlers/getmydate');
var getCurrentUser = require('./handlers/getcurrentuser');




// Required validation handlers
var datePostValidation = require('./handlers/validation/datepostvalidation');
var createDateValidation = require('./handlers/validation/createdatevalidation');
var userIsMemberOfThisDate = require('./handlers/validation/userismemberofthisdate');
var userHasDate = require('./handlers/validation/userhasdate');



// Config for our front-end app
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

    // Datepost routes
    app.get('/api/dateposts', isLoggedIn, getDatePosts); 							            // Returns all dateposts.
    
    app.post('/api/dateposts/', isLoggedIn, datePostValidation, userHasDate, addDatePost);  	// Adds datepost.

    app.get('/api/mydatepost', isLoggedIn, getMyActivePost);                        // Return the users active datepost

    app.delete('/api/datepost/:id', isLoggedIn, deleteDatePost);                    // Deletes users datepost

    app.post('/api/sendrequestto/:id', isLoggedIn, sendRequest);                    // Sends request to a datepost by id

    // Date routes
    app.post('/api/date/:postid/:reqid', isLoggedIn, createDateValidation, createDate); // Creates a new date if validation passes

    app.get('/api/date/mydate', isLoggedIn, getMyDate);                                 // Returns users date or '0' if no date is present.

    app.get('/api/date/:id', isLoggedIn, userIsMemberOfThisDate, getDateById);          // Returns date by id or '0' if no date is present. Avaiable to host and guest

    app.put('/api/date/:id', isLoggedIn, userIsMemberOfThisDate, endDate);          // Ends the date. Available to host and guest.



    // User routes
    app.get('/api/isloggedin', function(req, res){									// Returns if user is logged in. Used by route restriction in angular.
    	res.send(req.isAuthenticated() ? req.user : '0')
    });
    app.get('/api/users', isLoggedIn, getUsers); 									// Returns all user. Need to restrict.
    
    app.get('/api/currentuser', isLoggedIn, getCurrentUser);

    app.get('/api/user/:id', isLoggedIn, getUserById); 								// Get user by their ID. Strips private fields.

    app.put('/api/user', isLoggedIn, updateBio); 									// Update bio.


};
	// Server side authentication check for route restriction.
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.send('User is not logged in.')
	}
};