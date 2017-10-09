// import bCrypt to secure passwords
var bCrypt = require('bcrypt-nodejs');


module.exports = function (passport, users) {

    //initialize local passport strategy
    var Users = users;
    var LocalStrategy = require('passport-local').Strategy;

    //because passport has to save a user ID in the session, and it uses this to manage retrieving the user details when needed
    //serialize
    passport.serializeUser(function(users, done) {
        done(null, users.id);
    });

    //deserialize
    passport.deserializeUser(function(id, done) {
        Users.findById(id).then(function(users){
            if(users) {
                //return sequelize model if successful
                done(null, users);
            } else {
                done(users.errors, null);
            }
        })
    })

    //define localstrategy for SIGNUP
    passport.use("local-signup", new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        //callback function
        function (req, email, password, done) {
            //hashed password generating function
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            console.log(Users);

            Users.findOne({
                where: {
                    email: email
                }
            }).then(function (users) {
                if (users) {
                    console.log("That email is already taken");
                    return done(null, false, req.flash("error", "That email is already taken"));
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    Users.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    }).catch(function (err) {
                        var errorMsg = err.message;
                        // Find all "Validation Error:" from err.message and replace with " "
                        var modifiedErrorMsg = errorMsg.replace(new RegExp("Validation error:", "g"), " ");
                        console.log("Error: ", modifiedErrorMsg);
                        return done(null, false, req.flash("error", modifiedErrorMsg));
                    })
                }
            });
        }
    ));

    //define local strategy for SIGNIN
    passport.use("local-signin", new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },

        function (req, email, password, done) {
            var Users = users;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            Users.findOne({
                where: {
                    email: email
                }
            }).then(function (users) {
                if (!users) {
                    console.log("email does not exist")
                    return done(null, false, req.flash("error", "Email does not exist"));
                } else if (!isValidPassword(users.password, password)) {
                    console.log("incorrect pass")
                    return done(null, false, req.flash("error", "Incorrect Password"));
                }

                var userinfo = users.get(); 
                return done(null, userinfo);

            }).catch(function(err) {
                console.log("Error: ", err);
                return done(null, false, req.flash("error", "Something went wrong with your Signin"));
            })
        }
    ));
}

