// moved all routes into this file from the server.js file to clean things up

// API routes

// anything involving the need to access something from the server will need to have the model required in this file

// below is accessing the case.js file which contains the case model
var Case = require('./models/case');

// using module.exports makes everything inside of it accessible to outside files that require the file
// when using module.exports here, it needs to equal a function that passes in the variable that is calling express in the server.js file
// in this case the 'app' variable is ehat is calling express on server.js
module.exports = function(app, passport) {

  // this is saying that if you are on the root page of your app then render the index page
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // this route is similar to an 'otherwise' statement in angular where if the partial does not exist then it will redirect you back to the index page


  app.get('/views/:name', function(req, res) {
    var name = req.params.name;
    res.render('/views/partials/' + name);
  });

  // get all cases
  app.get('/api/cases', function(req, res) {

    // use mongoose to get all cases in the database
    Case.find(function(err, cases) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

        res.json(cases); // return all cases in JSON format
      });
  });

  // create case and send back all cases after creation
  app.post('/api/cases', function(req, res) {

    // create a case, information comes from AJAX request from Angular
    Case.create({
      text : req.body.text,
      done : false
    }, function(err, cases) {
      if (err)
        res.send(err);

        // get and return all the cases after you create another
        Case.find(function(err, cases) {
          if (err)
            res.send(err)
            res.json(cases);
          });
        });

      });

      // delete a case
      app.delete('/api/cases/:case_id', function(req, res) {
        Case.remove({
          _id : req.params.case_id
        }, function(err, cases) {
          if (err)
            res.send(err);

            // get and return all the cases after you create another
            Case.find(function(err, cases) {
              if (err)
                res.send(err)
              res.json(cases);
            });
          });
      });

      // all of the user routes below

      // the routes are being obtained here but they should not need anything inside of the function
      // all of the posting will happen on the angular side as long as the routes are defined
      app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0')
      });

      app.get('/login', passport.authenticate('local-login'), function(req, res) {
        res.send(req.user)
      });

      // getting the signup route
      // this is going to pass in the local-signup strategy as well since the actual post will happen on the angular side
      app.get('/signup', passport.authenticate('local-signup'), function(req, res) {

      });


      // logout route
      app.get('/logout', function(req, res) {
        req.logout();
        res.send(200);

        // after logout then redirect to the root page
        res.redirect('/');
      });

      // routing middleware to check if a user is logged in
      function isLoggedIn(req, res, next) {

        // if a user is authenticated then move on
        if (req.isAuthenticated())
          return next();

        // if there is nobody logged in then redirect them to the root page
        res.redirect('/');
      }
    };
