var db = require("../models");
module.exports = function(app, passport) {

        app.get('/profile/api/user/:user_id', (req,res) => {
            var user_id = req.params.user_id;
            db.Users.findOne({
                where: {id:user_id}
            }).then(dbUser => {
                console.log(dbUser);
                dbUser.getTrips().then(dbTripUser => {
                    console.log(dbTripUser);
                    var returnData = {
                        trips : dbTripUser
                    }
                    res.render('profile',returnData)
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
    app.get("/tripview", function(req, res) {
        res.render("tripview")
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