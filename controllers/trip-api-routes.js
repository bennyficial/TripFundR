var db = require('../models');

module.exports = function(app){

    // NEW TRIP
    app.post('/api/trip/new',function(req,res){
        var new_trip = req.body;

        // concatenating creator's full name.
        var creatorFirstName = req.user.dataValues.firstname;
        var creatorLastName = req.user.dataValues.lastname;
        var creatorFullName = creatorFirstName + " " + creatorLastName;

        db.Trip.create(new_trip).then(data =>{
            var trip_id = data.id;
            req.user.addTrip(data).then(
                db.Trip.findOne({
                    where: {id:trip_id}
                }).then(dbTrip => {
                    //update creator's name in database
                    dbTrip.update({
                        createdBy: creatorFullName
                    }).then(newDbTrip => {
                        var returnData = {
                            tripInfo: newDbTrip
                        };
                        res.json(returnData);
                    });
                })
            )
        })
    });

    // UPDATE A TRIP'S DETAILS
    app.put('/api/trip/update/:trip_id', (req,res) => {
        var trip_id = req.params.trip_id;
        db.Trip.update(
            req.body,
            {
                where:
                {id: trip_id}
            }
        )
    })

}