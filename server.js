// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var env = require('dotenv').load();
var flash = require("connect-flash");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var exphbs = require("express-handlebars");

app.set("views", "./views")
app.engine("handlebars", exphbs({ 
  extname: ".handlebars"
}));
app.set("view engine","handlebars");

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

// Flash
app.use(flash());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//load passport strategies
require('./config/passport/passport.js')(passport, db.Users);

// Routes
// =============================================================
require("./controllers/html-routes.js")(app, passport);
require("./controllers/trip-api-routes.js")(app, passport);
require("./controllers/users-api-routes.js")(app, passport);
require("./controllers/inventory-api-routes.js")(app, passport);
require("./controllers/contacts-api-routes.js")(app, passport);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
