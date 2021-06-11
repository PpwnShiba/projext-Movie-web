var mongoose = require('mongoose');
//กำหนด schema
var moviesSchema = new mongoose.Schema({
    name: String,
    header: String,
    image: String,
    score:{type: Number},
    genre: String,
    time: String,
    rate: String,
    ReleaseDate: String,
    title: String,
    Director: String,
    video: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]


});
module.exports = mongoose.model('Movies', moviesSchema);