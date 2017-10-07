module.exports = function(app, passport) {
    app.get ("/", function(req, res) {
        res.render("signin");
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
        res.render()
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