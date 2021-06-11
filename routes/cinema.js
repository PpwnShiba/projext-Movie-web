const bodyParser = require('body-parser');


var express = require('express'),
    router = express.Router(),

    Movies = require('../models/movies'),
    Location = require('../models/location'),
    User = require('../models/user');
   

router.get('/',function(req,res){
    Location.find({}, function(err, alllocation){
        if(err){
            console.log(err);
        }else{
            res.render('Cinema.ejs', { alllocation:alllocation}); 

        }
    });
});

router.post('/search-location',function(req,res){
    console.log("Trying to search location...");
    console.log(req.body.search_location);
    var name = req.body.search_location;
    res.redirect('/cinemas/search-location/' + name);
});

router.get('/search-location/:name', function(req,res){
    Location.find({location: new RegExp(req.params.name, 'i')}, function(err, foundCinema){
        if(err){
            console.log(err);
        } else {
            console.log(foundCinema);
            res.render('Cinema.ejs', {alllocation: foundCinema});
        }
    });
});
module.exports = router;