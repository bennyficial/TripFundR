// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport')
var session    = require('express-session')
var env = require('dotenv').load()

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine","handlebars");



// Static directory
app.use(express.static("public"));

//Models
var models = require("./models");

// Routes
// =============================================================
app.get('/profile', function(req,res){
    res.render("profile")
});
app.get('/tripview', function(req,res){
    res.render("tripview")
})

app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
    
       res.send('Welcome to Passport with Sequelize');
    
   });

var authRoute = require('./routes/auth.js')(app, passport);
	
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// Syncing our sequelize models and then starting our Express app
// =============================================================


models.sequelize.sync({ force: true }).then(function() {
  
     console.log('Nice! Database looks fine')
  
  }).catch(function(err) {
  
     console.log(err, "Something went wrong with the Database Update!")
  
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);

  });


