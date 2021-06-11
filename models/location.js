var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
   location: String,
   logo:String,
   theater:[
      {
      name: String,
      seats:{
         
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seat'
        
      }
   }
   ],
   reservation: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'reserve'
      },
  ]

});
module.exports = mongoose.model('Location', LocationSchema);