var db = require("../models");
module.exports = function(app, passport) {
    // USER PROFILES DISPLAY CURRENT TRIPS
    app.get('/profile/api/user/', (req,res) => {
        console.log("=======================")        
        console.log(req.user);
        console.log("=======================")        
        req.user.getTrips().then(dbTripUser => {
            console.log(dbTripUser);
            var returnData = {
                trips : dbTripUser
            }
            res.render('profile',returnData)
        })
    })  
    


    // TRIPS DISPLAY TRIP INFORMATION AND INVENTORY
    app.get('/api/trip/:trip_id', function(req,res){
        var trip_id = req.params.trip_id;
        db.Trip.findOne({
            where: {id:trip_id}
        }).then(dbTrip => {
            console.log(dbTrip);
            dbTrip.getItems().then(dbTripInventory => {
                console.log(dbTripInventory);
                dbTrip.getUsers().then(dbUsers => {
                    console.log(dbUsers)
                    var returnData = {
                        tripInfo: dbTrip,
                        items: dbTripInventory,
                        guests: dbUsers
                    };
                    res.render("tripview", returnData);
                })
            })
        })
    })
    
    
    app.get ("/", function(req, res) {
        res.render("intro");
        //res.render("welcome")
    });
    app.get ("/index", isLoggedIn, function (req, res) {
        res.render("index");
    });
    app.get ("/profile", function(req, res) {
        res.render("profile");
    });
    app.get("/create", function(req, res) {
        res.render("create");
    });
    app.get("/signup", function (req, res) {
        res.render("signup");
    });
    app.get("/signin", function (req, res) {
        res.render("signin");
    });
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect("/");
        })
    });


    app.post("/signup", passport.authenticate("local-signup", {
            successRedirect: "/index",
            failureRedirect: "/signup"
        }
    ));

    app.post("/signin", passport.authenticate("local-signin", {
            successRedirect: "/index",
            failureRedirect: "/signin"
        }
    ));

    
    // to protect main route
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    }
}