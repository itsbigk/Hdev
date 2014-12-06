// need to require mongoose everyewhere that you want to save to your database
// to avoid something like this then the file system would need to be entered into the serverjs file
// var mongoose = require('mongoose');

// Adding a schema may be needed in the future for bigger and more complex databases
// var TodoSchema = new mongoose.Schema({
//   text: String
// });

// If using a schema then the schema name would be added to the mongoose model name when creating it so it knows what key and value pairs to have
// Below is almost like adding a schema directly to the model itself
// var Todo = mongoose.model('Todo', {
//   text : String
// });