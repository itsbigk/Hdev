// moved all routes into this file from the server.js file to clean things up

// API routes

// anything involving the need to access something from the server will need to have the model required in this file

// below is accessing the case.js file which contains the case model
var Case = require('./models/case');

// using module.exports makes everything inside of it accessible to outside files that require the file
// when using module.exports here, it needs to equal a function that passes in the variable that is calling express in the server.js file
// in this case the 'app' variable is ehat is calling express on server.js
module.exports = function(app, passport) {

  // API ROUTES FIRST SO IT LOADS EVERYTHING YOU WANT TO RENDER ON THE PAGE AND THEN YOUR ANGULAR ROUTE LAST
  // IF YOU DO NOT PUT YOUR ANGULAR ROUTE LAST THEN IT WILL GIVE AN ERROR AND A RANDOM VALUE
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
      app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // if the user was successfully created then redirect to the profile page where Angular will take care of the rest
        failureRedirect : '/register', // if there is an error then redirect to the signup page and display message
        failureFlash : true // allow flash messages to tell if you made it successfully
      }));

      app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
      }));

      app.get('/', function(req, res) {
        res.render('index');
      });

      app.get('/register', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('register.ejs', { message : req.flash('gotToSignup') });
      });

      app.get('/login', function(req,res) {
        res.render('login.ejs', { message : req.flash('gotToLogin') });
      });

      app.get('/profile', function(req, res) {
        res.render('profile.ejs', {
          user : req.user //taking the user in the session and add it to the template
        });
      });

      // logout route
      app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
      });
};

function isLoggedIn(req, res, next) {

  // if user is authenticated then move on with what was happening
  if (req.isAuthenticated())
    return next();

    // if the user is not authenticated then it will redirect the user to the root page using below
    res.redirect('/');
}
