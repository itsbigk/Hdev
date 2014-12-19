// calling all of the needed packages
var express    = require('express'),                      // requiring express in the app
app            = express(),                              // create app with express
mongoose       = require('mongoose'),                   // mongoose for mongodb
morgan         = require('morgan'),                    // log requests to the console (express4)
bodyParser     = require('body-parser'),              // pull information from HTML POST (express4)
methodOverride = require('method-override'),         // simulate DELETE and PUT (express4)
port           = process.env.PORT || 3000,          // defining the port to be whatever the current environment's port is or 3000
passport       = require('passport'),              // requiring passport for authentication
passportLocal  = require('passport-local'),       // using passport for local authentication
session        = require('express-session'),     // calling the express-session package to help with user sessions
cookieParser   = require('cookie-parser'),      // parsing through cookies and helps store the session id into the browser
database       = require('./config/database'), // making sure the database is required in the app by specifying the path to the database.js file here
flash          = require('connect-flash');    // showing messages depending on what state of authentication you are in

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());                                      // gives the ability to use HTTP verbs in places where it is not normally supported
app.set('view engine', 'ejs');                                  // changing the view engine to ejs
app.use(cookieParser());                                        // using cookie parser in the app for sessions
app.use(passport.initialize());                                 // initializing passport and getting user data for session
app.use(passport.session());                                    // putting user data into the session
app.use(flash());                                               // flash messages that are stored inside of sessions
app.use(session({                                               // setting the session's secret. there are ways to randomize this every time and store this into a variable
  secret            : process.env.SESSION_SECRET || 'homeless',
  resave            : 'true',
  saveUninitialized : false
}));

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port: " + port);

// connecting to mongodb on the local side may need to add another connection for production when deploying to heroku
// mongoose.connect(database.url);//////////////

// loading all routes for the app
require('./app/routes')(app, passport);

// adding the passport configuration file
require('./config/passport')(passport);
