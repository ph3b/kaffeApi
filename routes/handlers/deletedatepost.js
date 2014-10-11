var Datepost = require('../../models/datepost');
var User = require('../../models/user');


module.exports = function(req, res){
	Datepost.findById(req.params.id).populate('poster').exec(function(err, datepost){
		if(err){
			res.send(err);
		}
		// Liker ikke denne iffen. Sjekk om vi kan gjøre den bedre
		// En idè og også legge inn en sjekk om man er admin
		if(String(req.user._id) === String(datepost.poster._id)){
			datepost.remove(function(err){
				if(err){
					res.send(err)
				}
				res.send('Datepost deleted');
				datepost.poster.activedatepost = null;
				datepost.poster.save(function(err){
					if(err){
						res.send(err);
					}
				})
			})
		}
	})
}