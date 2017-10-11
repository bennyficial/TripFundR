var db = require('../models');

module.exports = function(app){

    // ADDS INVENTORY AND ASSOCIATE IT TO A TRIP
    app.post('/api/trip/inventory/new/:trip_id', function(req,res){
        var new_item = req.body;
        var trip_id = req.params.trip_id;
        db.Inventory.create(new_item).then(dbItem => {
            db.Trip.findOne({
                where : {id:trip_id}
            }).then(dbTrip =>{
                dbTrip.addItem(dbItem);
                res.json(dbItem);
            })
        })
    })

    // // GRABS INVENTORY ASSOCIATED WITH A SPECIFIC TRIP
    app.get('/api/trip/:trip_id', function(req,res){
        var trip_id = req.params.trip_id;
        db.Trip.findOne({
            where: {id:trip_id}
        }).then(dbTrip => {
            console.log(dbTrip);
            dbTrip.getItems().then(dbTripInventory => {
                console.log(dbTripInventory);
                var returnData = {
                    tripInfo: dbTrip,
                    items: dbTripInventory
                };
                res.render("tripview", returnData
                );
            })
        })
    })

    // UPDATE A SPECIFIC INVENTORY ITEM
}
