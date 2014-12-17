// need to require mongoose everyewhere that you want to save to your database
var mongoose = require('mongoose');

// Adding a schema may be needed in the future for bigger and more complex databases
// var TodoSchema = new mongoose.Schema({
//   text: String
// });

// If using a schema then the schema name would be added to the mongoose model name when creating it so it knows what key and value pairs to have
// Below is almost like adding a schema directly to the model itself
// var Todo = mongoose.model('Todo', {
//   text : String
// });

// exporting the model here instead of leaving it in the server.js
module.exports = mongoose.model('Case', {
  title      : String,
  desc       : String,
  serial     : String,
  completed  : Boolean
});
