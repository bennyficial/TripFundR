var db = require('../models');


module.exports = function(app){
    // CREATES OR FIND A NEW USER
    app.post('/api/user/new',function(req,res){
        var login = req.body;
        console.log(login);
        db.Users.findOrCreate({
            where: login
        }).spread((users,created) => {
            console.log(users.get({
                plain: true
            }))
            console.log(created);
            res.json(users);
        })
    });

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
    app.post('/api/user/addtrip/userid/:user_id/trip/:trip_id',function(req,res){
        var user_id = req.params.user_id;
        var trip_id = req.params.trip_id;
        db.Users.findOne({
            where: {id: user_id}
        }).then(db_user =>{
            db.Trip.findOne({
                where: {id:trip_id}
            }).then(db_trip =>{
                db_user.addTrip(db_trip).then(data=>{
                    console.log(data);
                    res.json(data);
                })
            })
        })
    });


}