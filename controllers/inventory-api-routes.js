var db = require('../models');

module.exports = function(app){

    // ADDS INVENTORY AND ASSOCIATE IT TO A TRIP
    app.post('/api/trip/inventory/new/:trip_id', function(req,res){
        var new_item = req.body;
        var trip_id = req.params.trip_id;
        var redirectUrl = "/api/trip/" + trip_id;
        db.Inventory.create(new_item).then(dbItem => {
            db.Trip.findOne({
                where : {id:trip_id}
            }).then(dbTrip =>{
                dbTrip.addItem(dbItem);
                var returnData = {
                    items: dbItem
                }
                res.redirect(redirectUrl);
            })
        })
    });

    // // GRABS INVENTORY ASSOCIATED WITH A SPECIFIC TRIP
    app.get('/api/trip/:trip_id', function(req,res){
        var trip_id = req.params.trip_id;
        db.Trip.findOne({
            where: {id:trip_id}
        }).then(dbTrip => {
            dbTrip.getItems().then(dbTripInventory => {
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
    app.put('/api/trip/inventory/update/:inventory_id', function (req, res) {
        var itemId = req.params.inventory_id;
        // concatenating creator's full name.
        var contributorFirstName = req.user.dataValues.firstname;
        var contributorLastName = req.user.dataValues.lastname;
        var contributorFullName = contributorFirstName + " " + contributorLastName;
        db.Inventory.findOne({
            where: {id: itemId}
        }).then(dbItem => {
            dbItem.update({
                isDone: true,
                contributorName: contributorFullName
            }).then(dbNewItem => {
                res.json(dbNewItem);
            })
        })
    })
}
