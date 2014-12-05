// need to require mongoose everyewhere that you want to save to your database
// to avoid something like this then the file system would need to be entered into the serverjs file
var mongoose = require('mongoose');

var BearSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Bear', BearSchema);