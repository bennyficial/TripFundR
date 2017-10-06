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
                done(null, users.get());
            } else {
                done(users.errors, null);
            }
        })
    })

    //define localstrategy for signup
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
                    return done(null, false, {message: "That email is already taken"});
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
                        console.log("Error: ", err[0].message);
                        return done(null, false, {message: "Something went wrong with signup"});
                    })
                }
            });
        }
    ));
}