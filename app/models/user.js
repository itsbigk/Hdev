var mongoose = require('mongoose'),       // needing to require mongoose since there are mongoose methods needing to be ran
bcrypt       = require('bcrypt-nodejs'), // requiring the bcrypt node module here to be able to encrypt the passwords
userSchema   = mongoose.Schema({        // making the user schema
    email        : { type : String, required : true, index : { unique : true}},
    password     : { type : String, required : true, select : false }
  // commented out oauth stuff
  // facebook         : {
  //   id           : String,
  //   token        : String,
  //   email        : String,
  //   name         : String
  // },
  // twitter          : {
  //   id           : String,
  //   token        : String,
  //   displayName  : String,
  //   username     : String
  // },
  // google           : {
  //   id           : String,
  //   token        : String,
  //   email        : String,
  //   name         : String
  // }

});

// bcrypt redo for jwt
userSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if it has been changed or it is a new user
  if(!user.ismodified('password')) return next();

  // generate salt
  bcrypt.hash(user.password, null, null, function(err, hash) {
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

// bcrypt logic used by passport
// generating a hash of the password that the user entered in the signup process
// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
//
// // checking to make sure the password is valid
// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };
// end passport bcrypt logic

// creating a model for the users
module.exports = mongoose.model('User', userSchema);
