var db = require('../models');

module.exports = function(app){
    // CREATES OR FIND A NEW USER ** WE DONT NEED THIS AS PASSPORT IS STORING TO DB **
    // app.post('/api/user/new',function(req,res){
    //     var login = req.body;
    //     console.log(login);
    //     db.Users.findOrCreate({
    //         where: login
    //     }).spread((users,created) => {
    //         console.log(users.get({
    //             plain: true
    //         }))
    //         console.log(created);
    //         res.json(users);
    //     })
    // });

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
        }).catch(error =>{
            res.send('User not found in FundR datebase');
        }).then(dbUser => {
            db.Trip.findOne({
                where: {id:trip_id}
            }).then(dbTrip => {
                dbUser.addTrip(dbTrip).then(data =>{
                    res.json(data);
                })

            })
        })
    })


}