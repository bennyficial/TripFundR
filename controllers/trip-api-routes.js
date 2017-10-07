var db = require('../models');

module.exports = function(app){

    // NEW TRIP
    app.post('/api/trip/new',function(req,res){
        var new_trip = req.body;
        console.log(new_trip);
        db.Trip.create(new_trip).then(data =>{
            var trip_id = data.id;
            db.Trip.findOne({
                where: {id:trip_id}
            }).then(dbTrip => {
                var returnData = {
                    tripInfo: dbTrip
                };
                res.render("tripview",returnData);
            })
        })
    })

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