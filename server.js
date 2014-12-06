// calling all of the needed packages
var express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      // logging requests
      morgan = require('morgan'),
      // adding the todo model to the server
      // this would almost eliminate the need for requiring specific folders in the filesystem
      Todo = require('./app/models/todo'),
      // mongodb connection using mongoose
      mongoose = require('mongoose'),
      // setting the express router for defining custom routes for the api
      router = express.Router();
      // setting the port that you want to use
      port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/express-node');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

// rendering everything in the public folder. i can see this being good to use for single page apps
app.use(express.static(__dirname + '/public'));


// API routes

// middleware for all requests
// everything runs in the order that is specified
router.use(function(req, res, next) {
  // do some logging
  console.log('something is working');
  next(); //this makes sure it proceeds to the next route instead of stopping here
});

// more routes for CRUD here

// here it is for all routes that end in todos specifically
// the todos api endpoint is http://localhost:8080/api/todos
router.route('/api/todos')
  // with chaining the methods in this cleaner way it is important to only put a semicolon on the end of the final method for the route
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos);
    });
  })
  // .post is indicating that this will be saving something to the server
  .post(function(req, res) {
    // creating the todo and checking for errors
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if (err)
        res.send(err);

      // if there is no error then return all of the todos after another is created to update the list
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });
  
  // deleting and updating a todo is all that is really needed for this section unless there is a need to look up one specific todo in the future
  // if that is the case then all that would be needed to be added is a get method 
  router.route('/api/todos/:todo_id')

    // deleting a todo with a specific id
    .delete(function(req, res) {
        Todo.remove({
          _id : req.params.todo_id
        }, function(err, todo) {
          if (err)
          res.send(err)
        // return all of the todo items after one is deleted with no errors
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
        res.json(todos);
      });
    });
  });

    // updating a specific todo by id
    .put(function(req, res) {
      // once again using the todo model to find a specific todo by id
      Todo.findById(req.params.todo_id, function(err, todo) {
        if (err)
          res.send(err);

        todo.text = req.body.text; //updating the todo's info here

        // saving the todo after the update has been completed
        todo.save(function(err) {
          if (err) 
            res.send(err);

          res.json({ message: 'todo has been updated!' });
        });
      });
    })

  // all of the routes are currently set up to be used as api routes
  // this line creates a new path that the client can access called /api so it would look like http://localhost:8080/api
  app.use('/api', router);

// testing the route to make sure everything is connected
router.get('*', function(req, res) {
  // only need one route for everything because angular will be handling all of the frontend work
  res.sendfile('./public/index.html')
  console.log('welcome to the homepage');
});

// run server
app.listen(port);
console.log('it should be running if this message is showing. it is working on port ' + port);
