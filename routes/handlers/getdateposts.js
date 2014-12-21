var datePost = require('../../models/datepost');

module.exports = function(req, res){
	// Initialize compare objects
	var now = new Date();
	var midnight = new Date();
	midnight.setHours(23);
	midnight.setMinutes(59);
	midnight.setSeconds(0);
	// Return all dateposts where the time is between now and midnight today
	datePost.find({'datetime': {'$gte': now, '$lte' : midnight}, 'active' : true})
        .lean()
		.populate('poster', 'firstname lastname facebookid')
		.exec(function(err, dateposts){
			if(err){
				res.send(err)
			}
            for(var i in dateposts){
                dateposts[i]['reqHasBeenSent'] = false;
                dateposts[i].requests.some(function(datepost){
                    dateposts[i]['reqHasBeenSent'] = true;
                });
                delete dateposts[i]['requests'];

            }
		    res.send(dateposts);
	});
}