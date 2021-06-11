var mongoose = require('mongoose');

var reserveSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    },
    movie: String,
    date : String,

    location: String,
    theater: String,
    boughtTime: {
        type: Date,
        default: Date.now
    },

    seats: [String],

});

module.exports = mongoose.model('reserve', reserveSchema);