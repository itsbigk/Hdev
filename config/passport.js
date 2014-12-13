var Local = require('passport-local').Strategy,
User      = require('../app/models/user');

// export this function so it can be used by the rest of the server
module.exports = function(passport) {

  // passport sessions

  // serializing and unserializing users out of sessions

  // serializing the user for the session using their id from the database
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  // deserializing the user out of the session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err,user);
    });
  });

  // local signup. if there is no name then it should just be called local by default
  passport.use('local-signup', new Local({
    // needing the override the username field with email since the local strategy defaults to username
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true // gives the ability to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    // unless data is sent back, the User.findOne function wont fire
    process.nextTick(function() {
      User.findOne({ 'local.email' : email }, function(err, user) {
        // if there is an error then return it
        if (err)
          return done(err);

        // checking to see if there is already a user with that email
        if (user) {
          return done(null, false, req.flash('signupMessage', 'There is already an email account that is registered with that email'));
        } else {

          // if there is no email matching the user then create the user
          // creating a user
          var newUser = new User();

          // setting the user's local credentials
          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser)
          });
        }
      });
    });
  }));

  // adding local login for the passport sessions
  passport.use('local-login', new Local({
    // once again the username will be overidden here as well
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    // callback with the user email and password from the form

    // finding a user whose email elready exists
    User.findOne({ 'local.email' : email }, function(err, user) {
      if (err)
        return done(err);

      // if no user is found then return a message saying the user was not found
      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user was found with that email address'));

      // in case the user is correct but the password is wrong
      if(!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'The password is incorrect'));

      // if everything is good then it will return the user
      return done(null, user);
    });
  }));
};
