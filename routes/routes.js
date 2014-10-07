var getDatePosts = require('./handlers/getdateposts');
var addDatePost = require('./handlers/adddatepost');

module.exports = function(app, passport){
    
    app.get('/login', function(req,res){
        console.log('Logg inn route');
    });

    app.get('/user', function(req, res){
    	res.send(req.user);
    })
    // Facebook authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

    app.get('/auth/facebook/callback',
    	passport.authenticate('facebook', {
    		successRedirect : '/success',
    		failureRedirect : '/failure'
    	}));

    app.get('/api/dateposts', getDatePosts);
    app.get('/api/dateposts/:postid', function(req, res){
    	
    })
    app.post('/api/dateposts/', addDatePost);

    app.get('/api/isloggedin', function(req, res){
    	res.send(req.isAutenticated ? req.user : '0');
    })

}
function isLoggedIn(req, res, next){
	if(req.isAthenticated()){
		return next();
	}
	res.send('User is not logged in.')
}
