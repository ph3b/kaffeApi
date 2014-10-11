var User = require('../../models/user');

module.exports = function(req, res){
	User.findById(req.params.id, 'firstname lastname bio facebookid', function(err, user){
    		if(err){
    			res.send(err)
    		}
    		res.send(user)
    	});
};