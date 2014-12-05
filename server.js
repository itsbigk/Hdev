// calling all of the needed packages
var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      // adding the bear model to the server
      // this would almost eliminate the need for requiring specific folders in the filesystem
      Bear = require('./app/models/bear'),
      // mongodb connection using mongoose
      mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/express-node');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  // setting the port that you want to use

// API routes
var router = express.Router(); //getting an instance of the express router

// middleware for all requests
// everything runs in the order that is specified
router.use(function(req, res, next) {
  // do some logging
  console.log('something is working');
  next(); //this makes sure it proceeds to the next route instead of stopping here
});

// more routes for CRUD here

// here it is for all routes that end in bears specifically
// the bears api endpoint is http://localhost:8080/api/bears
router.route('/bears')
  // .post is indicating that this will be saving something to the server
  .post(function(req, res) {
    var bear = new Bear(); //creating a new instance of the bear model
    bear.name = req.body.name; //setting the bears name depending on what the request says

    // saving the bear and checking for errors
    bear.save(function(err) {
      if (err)
       res.send(err);

      res.json({ message: 'bear has been created!' });
    });
  })
  // with chaining the methods in this cleaner way it is important to only put a semicolon on the end of the final method for the route
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);
      res.json(bears);
    });
  });

  // getting a specific bear from the databse back
  router.route('/bears/:bear_id')

    // making a get method that will take a bear from the database with a specific id and return the json data for that object
    .get(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
          res.send(err)
        res.json(bear);
      });
    })

    // updating a specific bear by id
    .put(function(req, res) {
      // once again using the bear model to find a specific bear by id
      Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
          res.send(err);

        bear.name = req.body.name; //updating the bear's info here

        // saving the bear after the update has been completed
        bear.save(function(err) {
          if (err) 
            res.send(err);

          res.json({ message: 'bear has been updated!' });
        });
      });
    })

    // deleting a bear with a specific id
    .delete(function(req, res) {
      Bear.remove({
        _id: req.params.bear_id
      }, function(err, bear){
          if (err)
            res.send(err)

          res.json({ message: 'successfully deleted' });
      });
    });



  // all of the routes are currently set up to be used as api routes
  // this line creates a new path that the client can access called /api so it would look like http://localhost:8080/api
  app.use('/api', router);

// testing the route to make sure everything is connected
router.get('/', function(req, res) {
  res.json({ message: 'everything is working for this api route' });
});

// run server
app.listen(port);
console.log('it should be running if this message is showing. it is working on port ' + port);
