var db = require('../models');


module.exports = function(app){
    // UPDATES USER INFORMATION 
    app.put('/api/user/update/:user_id', (req,res) => {
        var user_id = req.params.user_id;
        db.Users.update(
            req.body,
            {where:
                {id:user_id}
            }   
        )
    })

    // ADD A NEW TRIP TO A USER
    app.get('/api/user/addtrip/:trip_id',function(req,res){

        var trip_id = req.params.trip_id;
        db.Trip.findOne({
            where: {id:trip_id}
        }).then(dbTrip =>{
            req.user.addTrip(dbTrip).then(data => {
                res.json(data)
            })
        })
    });

    // INVITE A USER TO A TRIP
    app.post("/api/trip/addtrip/:trip_id", function(req,res){
        var trip_id = req.params.trip_id;
        db.Users.findOne({
            where: req.body
        }).then(dbUser => {
            if(!dbUser){
                res.json({
                    error:true,
                    message:"User does not exist"
                })
            }else{
                db.Trip.findOne({
                    where: {id:trip_id}
                }).then(dbTrip => {
                    dbUser.addTrip(dbTrip).then(data =>{
                        res.json(data);
                    })
                })
            }
        })
    })


}