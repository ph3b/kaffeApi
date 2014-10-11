var User = require('../../models/user');

module.exports = function(req, res){
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
}