var mongoose = require('mongoose');

var TimeSchema = new mongoose.Schema({
   idnametheater:String,
   time:String

});
module.exports = mongoose.model('Time', TimeSchema);