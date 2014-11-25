// Server file that will be ran with 'node server.js' or 'nodemon server.js' if you want to have the ability to restart your server on the fly without stopping your server

// Setting up the variables ======

    // Adding the variable 'express' to make sure that you require express since that is what is being used
    var express = require('express');

    // Firing the express framework
    var app = express();

    // Making sure we can use MongoDB in this app by requiring mongoose
    var mongoose = require('mongoose');

    // Morgan is being used to log requests to the console
    var morgan = require('morgan');

    // Body parser is pulling information from the HTML POST
    var bodyParser = require('body-parser');

    // DELETE and PUT simulation is what method-override does for you
    var methodOverride = require('method-override');

// config ======

    // Connecting to a mongo database that is local. This would have to change if you were doing this on something like heroku
    
    mongoose.connect('mongodb://localhost/express-node')

    // Setting static file location from /public/something to /something for users. Just something to simplify things
    app.use(express.static(__dirname + '/public'));

    // log all requests to the console
    app.use(morgan('dev'));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({'extended':'true'}));

    // parse application/vnd.api+json as json
    app.use(bodyParser.json());

    app.use(methodOverride());

    
    // Defining a model for mongoose ============
    var Todo = mongoose.model('Todo', {
      text : String
    });

    // Adding in routes ====================

        // api routes getting back all of the todos that are being made
        app.get('/api/todos', function(req, res) {

          // Using mongoose to get everything from the database in the /api/todos path
          Todo.find(function(err, todos) {

            // if there is an error then it will show the error and then nothing after it will execute
            if (err)
              res.send(err)

            res.json(todos); // Returning all of the todos in JSON format
          });
        });

        // Return all Todos after created. This is also creating a todo with app.post
        app.post('/api/todos', function(req, res) {
          // creating a todo and the information is coming from an AJAX request from the Angular side
          Todo.create({
            text: req.body.text,
            done: false
          }, function(err, todo) {
            if (err)
              res.send(err);

            // Return all todos after one is created
            Todo.find(function(err, todos) {
              if (err)
                res.send(err)
              res.json(todos);
            });
        });
      });

        // Deleting a todo

        app.delete('/api/todos/:todo_id', function(req, res) {
          Todo.remove({
            _id : req.params.todo_id
          }, function(err, todo) {
            if (err)
              res.send(err)

            // Return the todos after deleting one
            Todo.find(function(err, todos) {
              if (err)
                res.send(err)
              res.json(todos);
            });
        });
      });

        // Application route ============

        app.get('*', function(req, res) {
          res.sendfile('./public/index.html'); // This is loading the single view page. Angular will handle all of the page changes on the front end
        });

    // Below is the code for telling node what port to listen on =============

    app.listen(8080);
    console.log("App listening on port 8080");









