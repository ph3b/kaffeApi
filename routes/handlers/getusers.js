var User = require('../../models/user');

module.exports = function(req, res){
	User.find(function(err, user){
    		if(err){
    			res.send(err)
    		}
    		res.send(user)
    	});
};