const bodyParser = require('body-parser');


var express = require('express'),
    router = express.Router(),
    reserve = require('../models/reserve'),
    Movies = require('../models/movies'),
    Location = require('../models/location'),
    User = require('../models/user');
   

router.get('/',function(req,res){
    Location.find({}, function(err, alllocation){
        if(err){
            console.log(err);
        }else{
            res.render('cinema/Cinema.ejs', { alllocation:alllocation}); 

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
            res.render('cinema/Cinema.ejs', {alllocation: foundCinema});
        }
    });
});

router.get('/location/:id_location', function(req, res){
    Location.findById(req.params.id_location, function(err, foundlocation){
        if(err){
            console.log(err);
        }else{
            console.log(foundlocation);
            Movies.find({}, function(err, foundmovies){
                if(err){
                    console.log(err);
                }else{
                    res.render('cinema/each-location.ejs', {movies:foundmovies, foundlocation:foundlocation});
                }
            })
        }
    });
});

router.get('/location/user/mypage', function(req, res){
    User.findById(req.user._id).populate('comments').populate('myfav').exec(function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            Movies.find({}, function(err, foundmovie){
                if(err){
                    console.log(err);
                }else{
                    reserve.find({}, function(err, foundreserve){
                        if(err){
                            console.log(err);
                        }else{
                            console.log(foundCollection);
                            res.render('mypage.ejs', {founduser:foundCollection, foundmovie:foundmovie, foundreserve:foundreserve});
                        }
                    });
                   
                }
            });
            
        }
    });
});
module.exports = router;