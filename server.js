// calling all of the needed packages
    // set up ========================
    var express    = require('express'),
    app            = express(),                               // create our app w/ express
    mongoose       = require('mongoose'),                     // mongoose for mongodb
    morgan         = require('morgan'),             // log requests to the console (express4)
    bodyParser     = require('body-parser'),    // pull information from HTML POST (express4)
    methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use('/bower_components',  express.static(__dirname + '/bower_components')); // making the bower_components folder accessible
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

    // making sure the database is required in the app by specifying the path to the database.js file here
    var database = require('./config/database');

    // connecting to mongodb on the local side may need to add another connection for production when deploying to heroku
    mongoose.connect(database.url);

    // loading all routes for the app
    require('./app/routes')(app);
