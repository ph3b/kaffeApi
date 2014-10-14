var Datepost = require('../../models/datepost');
var User = require('../../models/user');

module.exports = function(req, res){
	Datepost.findById(req.params.id).populate('poster').exec(function(err, datepost){
		if(err){
			res.send(err);
		}
		// Liker ikke denne iffen. Vi kan bedre enn dette
		// En idè er å også legge inn en sjekk om man er admin (da må req.user._id erstattes)
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
		} else {
            res.send('This is not your datepost!');
        }
	})
};