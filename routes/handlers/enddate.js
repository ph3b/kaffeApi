/**
 * Created by mattiden on 14.10.14.
 */
var DateObject = require('../../models/date');
var User = require('../../models/user');

module.exports = function(req, res){
    DateObject.findById(req.params.id)
        .populate('host')
        .populate('guest')
        .exec(function(err, dateobject){
            if(err){
                return res.send(err);
            }
            if(!dateobject.active){
                return res.send('Deleted');
            }
            dateobject.active = false;

            // Lets remove the pointer to this date from activedate field from our host.
            // Also we add this date to the datehistory
            User.findById(dateobject.host, function(err, host){
                host.activedate = null;
                host.datehistory.push(dateobject);
                host.save(function(err){
                    if(err){
                        return res.send(err);
                    }
                })
            });
            // And do the same for our guest.
            User.findById(dateobject.guest, function(err, guest){
                guest.activedate = null;
                guest.datehistory.push(dateobject);
                guest.save(function(err){
                    if(err){
                        return res.send(err);
                    }
                })
            });

            dateobject.save(function(err){
                if(err){
                    return res.send(err)
                }
            });
        return res.send('Deleted');
        console.log('Ok... all done');
        })

}