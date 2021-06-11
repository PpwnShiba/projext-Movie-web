var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    movie:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        },
        name: String
    }

});

module.exports = mongoose.model('Comment', commentSchema);