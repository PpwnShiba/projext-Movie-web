var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
    surename: String,
    profile: String,
    myfav:[{
        id:     {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        },
        name: String
    }],
   comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    reservation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reserve'
        },
    ],
    IsAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);