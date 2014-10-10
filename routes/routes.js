var getDatePosts = require('./handlers/getdateposts');
var addDatePost = require('./handlers/adddatepost');
var frontend = require('../config/frontend');
var User = require('../models/user');

var baseFront = frontend.appBase;
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
    		successRedirect : baseFront + 'feed',
    		failureRedirect : '/failure'
    	}));

    app.get('/api/dateposts', getDatePosts);
    app.get('/api/dateposts/:postid', function(req, res){
    	
    })
    app.post('/api/dateposts/', isLoggedIn, addDatePost);

    app.get('/api/isloggedin', function(req, res){
    	res.send(req.isAuthenticated() ? req.user : '0')
    })
    app.get('/api/users', isLoggedIn, function(req, res){
    	User.find(function(err, user){
    		if(err){
    			res.send(err)
    		}
    		res.send(user)
    	})
    });
    app.get('/api/currentuser', isLoggedIn, function(req, res){
    	res.send(req.user);
    })
    app.get('/api/user/:id', isLoggedIn, function(req, res){
    	User.findById(req.params.id, 'firstname lastname bio facebookid', function(err, user){
    		if(err){
    			res.send(err)
    		}
    		res.send(user)
    	})
    })
    app.put('/api/user', isLoggedIn, function(req, res){
    	User.findById(req.user._id, function(err, user){
    		if(err){
    			res.send(err)
    		}
    		user.bio = req.body.bio;
    		user.save(function(err){
    			if(err){
    				res.send(err)
    			}
    			res.send('Bio har blitt oppdatert');
    		})
    	})
    }),
    app.get('/api/user/:id', isLoggedIn, function(req, res){
    	User.findById(req.params.id, 'facebookid', function(err, user){
    		if(err){
    			res.send(err)
    		}
    		res.send(user)
    	})
    })

}
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.send('User is not logged in.')
	}
}
