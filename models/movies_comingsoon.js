var mongoose = require('mongoose');
//กำหนด schema
var movies_comingsoonSchema = new mongoose.Schema({
    name: String,
    image: String,
    header: String,
    genre: String,
    time: String,
    rate: String,
    ReleaseDate: String,
    title: String,
    Director: String,
    video: String
});
module.exports = mongoose.model('Movies-comingsoon', movies_comingsoonSchema);