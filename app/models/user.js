var mongoose = require('mongoose'),       // needing to require mongoose since there are mongoose methods needing to be ran
bcrypt       = require('bcrypt-nodejs'), // requiring the bcrypt node module here to be able to encrypt the passwords
userSchema   = mongoose.Schema({        // making the user schema

  local            : {
    email        : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }

});

// generating a hash of the password that the user entered in the signup process
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking to make sure the password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// creating a model for the users
module.exports = mongoose.model('User', userSchema);
