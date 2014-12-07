// moved all routes into this file from the server.js file to clean things up

// API routes

// anything involving the need to access something from the server will need to have the model required in this file

// below is accessing the todo.js file which contains the todo model
var Todo = require('./models/todo');

// using module.exports makes everything inside of it accessible to outside files that require the file
// when using module.exports here, it needs to equal a function that passes in the variable that is calling express in the server.js file
// in this case the 'app' variable is ehat is calling express on server.js
module.exports = function(app) {
// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

      res.json(todos); // return all todos in JSON format
    });
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if (err)
        res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
            res.json(todos);
          });
        });

      });

      // delete a todo
      app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
          _id : req.params.todo_id
        }, function(err, todo) {
          if (err)
            res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
              if (err)
                res.send(err)
                res.json(todos);
              });
            });
          });

          // the one and only route for the application to run ===================
          app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // loads the one and only page that you need and angular will take care of the rest on the front end
          });
};
