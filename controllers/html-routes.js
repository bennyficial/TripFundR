var db = require("../models");
module.exports = function(app, passport) {
    // USER PROFILES DISPLAY CURRENT TRIPS
    app.get('/profile', isLoggedIn, (req,res) => {
        req.user.getTrips().then(dbTripUser => {
            var returnData = {
                trips : dbTripUser
            }
            res.render('profile',returnData)
        })
    })  
    


    // TRIPS DISPLAY TRIP INFORMATION AND INVENTORY
    app.get('/api/trip/:trip_id', isLoggedIn, function(req,res){
        var trip_id = req.params.trip_id
        // CHECK IF USER IS ASSOCIATED WITH TRIP_ID IN URL
        req.user.getTrips({
            where: {id:trip_id}
        }).then(dbAssociations => {
            // EMPTY RETURN ARRAY MEANS USER NOT ASSOCIATED WITH TRIP
            if (dbAssociations.length === 0){
                res.send("Error: Access Denied")
            } else{
                db.Trip.findOne({
                    where: {id:trip_id}
                }).then(dbTrip => {
                    dbTrip.getItems().then(dbTripInventory => {
                        dbTrip.getUsers().then(dbUsers => {
                            var returnData = {
                                tripInfo: dbTrip,
                                items: dbTripInventory,
                                guests: dbUsers
                            };
                            res.render("tripview", returnData);
                        })
                    })
                })                 
            }
        })
    })  
    

    
    
    app.get ("/", function(req, res) {
        // connect-flash sends an array of messages
        res.render("intro", {error: req.flash("error")[0]});
    });
    app.get ("/intro", function(req, res) {
        res.render("intro");
    });
    app.get ("/index", isLoggedIn, function (req, res) {
        res.render("index");
    });
    app.get("/create", isLoggedIn, function(req, res) {
        res.render("create");
    });
    app.get("/signup", function (req, res) {
        res.render("signup", {error: req.flash("error")[0]});
    });
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        })
    });


    app.post("/signup", passport.authenticate("local-signup", {
            successRedirect: "/index",
            failureRedirect: "/signup",
            failureFlash:true
        }
    ));

    app.post("/signin", passport.authenticate("local-signin", {
            successRedirect: "/index",
            failureRedirect: "/",
            failureFlash:true
        }
    ));

    
    // to protect main route
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/");
    }
}