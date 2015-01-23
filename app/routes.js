// moved all routes into this file from the server.js file to clean things up

// API routes

// anything involving the need to access something from the server will need to have the model required in this file

var Todo = require('./models/case'),  // accessing the case.js file which contains the case model
User     = require('./models/user'); // including the user model for authentication

// using module.exports makes everything inside of it accessible to outside files that require the file
// when using module.exports here, it needs to equal a function that passes in the variable that is calling express in the server.js file
// in this case the 'app' variable is ehat is calling express on server.js
// passport has been removed from the function's parameters below to switch to json web token
module.exports = function(app, jwt) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  // API ROUTES FIRST SO IT LOADS EVERYTHING YOU WANT TO RENDER ON THE PAGE AND THEN YOUR ANGULAR ROUTE LAST
  // IF YOU DO NOT PUT YOUR ANGULAR ROUTE LAST THEN IT WILL GIVE AN ERROR AND A RANDOM VALUE
  // get all cases
  app.get('/api/cases', function(req, res) {

    // use mongoose to get all cases in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

        res.json(todos); // return all cases in JSON format
      });
    });

  // create case and send back all cases after creation
  app.post('/api/cases', function(req, res) {

    // create a case, information comes from AJAX request from Angular
    Todo.create({
      user_id   : process.getuid(),
      serial    : req.body.serial,
      desc      : req.body.desc,
      done      : false
    }, function(err, cases) {
      if (err)
        res.send(err);

        // get and return all the cases after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
            res.json(todos);
          });
        });

      });

      // delete a case
      app.delete('/api/cases/:case_id', function(req, res) {
        Todo.remove({
          _id : req.params.case_id
        }, function(err, todo) {
          if (err)
            res.send(err);

            // get and return all the cases after you create another
            Todo.find(function(err, todos) {
              if (err)
                res.send(err)
                res.json(todos);
              });
            });
          });

      // user routes
      app.post('/api/users', function(req, res) {
        var user = new User();

        // setting all of the user's info based on what the user puts in the form
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err) {
          if(err) {
            // if there is already a user with that email
            if(err.code == 11000)
              return res.json({ success : false, message : 'There is already a user witht that email that exists.' });
            else
              return res.send(err);
          }

          res.json({ message : 'User created!' });
        });
      })

      // getting all users
      app.get('/api/users', function(req, res) {
        User.find(function(err, users) {
          if (err) res.send(err);

          // return all users in json format
          res.json(users);
        });
      });

      // getting a single user back
      app.get('/api/users/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err) res.send(err);

          // return user
          res.json(user);
        });
      })

      // route to edit user information
      app.put('/api/users/:user_id', function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
          if (err) res.send(err);

          // update user info
          if (req.body.email) user.email = req.body.email;
          if (req.body.password) user.password = req.body.password;

          // save user
          user.save(function(err) {
            if (err) res.send(err);

            // return message
            res.json({ message : 'User updated!' });
          });
        });
      })

      // deleting a user
      app.delete('/api/users/:user_id', function(req, res) {
        User.remove({
          _id : req.params.user_id
        }, function(err, user) {
          if (err) res.send(err);
          res.json({ message : 'Successfully deleted user!' });
        });
      })

      app.post('/authenticate', function(req, res) {
        // finding the user
        User.findOne({
          email : req.body.email
        }).select('name email password').exec(function(err, user) {
          if(err) throw err;

          // if no user with that email was found
          if(!user) {
            res.json({
              success : false,
              message : 'Authentication failed. User not found'
            });
          } else if (user) {
            var validPassword = user.comparePassword(req.body.password);

            if (!validPassword) {
              res.json({
                success : false,
                messgae : 'Authentication failed. Wrong password'
              });
            } else {
              // if the email and password is correct then give token to the user
              var token = jwt.sign({
                email : user.email
              }, secret, {
                expiresInMinutes : 1441 // expires in 24 hours and 1 minute
              });

              res.json({
                success : true,
                message : 'Have fun!',
                token   : token
              });
            }
          }
        });
      });
      // all of the passport routes below
      // app.post('/register', passport.authenticate('local-signup', {
      //   successRedirect : '/profile', // if the user was successfully created then redirect to the profile page where Angular will take care of the rest
      //   failureRedirect : '/register', // if there is an error then redirect to the signup page and display message
      //   failureFlash : true // allow flash messages to tell if you made it successfully
      // }));
      //
      // app.post('/login', passport.authenticate('local-login', {
      //   successRedirect : '/profile',
      //   failureRedirect : '/login',
      //   failureFlash : true
      // }));
      // end passport routes

      // routes formerly used to go to the various authentication pages used by passport
      // app.get('/register', function(req, res) {
      //   // render the page and pass in any flash data if it exists
      //   res.render('register.ejs', { message : req.flash('gotToSignup') });
      // });
      //
      // app.get('/login', function(req,res) {
      //   res.render('login.ejs', { message : req.flash('gotToLogin') });
      // });
      //
      // app.get('/profile', function(req, res) {
      //   res.render('profile.ejs', {
      //     user : req.user //taking the user in the session and add it to the template
      //   });
      // });

      // logout route for passport
      // app.get('/logout', function(req, res) {
      //   req.logout();
      //   res.redirect('/');
      // });
};

// more passport logic
// function isLoggedIn(req, res, next) {
//
//   // if user is authenticated then move on with what was happening
//   if (req.isAuthenticated())
//     return next();
//
//     // if the user is not authenticated then it will redirect the user to the root page using below
//     res.redirect('/');
// }
