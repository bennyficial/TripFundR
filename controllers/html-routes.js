module.exports = function(app, passport) {
    app.get ("/", function(req, res) {
        res.render("index");
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

    
    // to protect main route
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/');
    }
}