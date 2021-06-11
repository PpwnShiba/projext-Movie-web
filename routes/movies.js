const bodyParser = require('body-parser');


var express = require('express'),
    router = express.Router(),
    movies = require('../models/movies'),
    moviesComingsoon = require('../models/movies_comingsoon'),
    location = require('../models/location'),
    User = require('../models/user');
   
router.use(bodyParser.urlencoded({extended: false}));

router.get('/',function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            res.render('Now-showing.ejs', {allmovies_now: allMovies}); 
        }
        
    });
});


router.post('/search-movie',function(req,res){
    console.log("Trying to search movie...");
    console.log(req.body.search_movie);
    var name = req.body.search_movie;
    res.redirect('/movies/search-movie/' + name);
});

router.get('/search-movie/:name', function(req,res){
    movies.find({name: new RegExp(req.params.name, 'i')}, function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            console.log(foundMovies);
            res.render('now-showing.ejs', {allmovies_now: foundMovies, sort: req.params.name});
        }
    });
});



router.get('/now-showing/sort-by-Alphabet', function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            console.log('Sort by Alphabet');
            res.render('Now-showing.ejs', {allmovies_now: allMovies}); 
        }
    }).sort({'name': 1});
});
router.get('/now-showing/sort-by-genre', function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            console.log('Sort by genre');
            res.render('Now-showing.ejs', {allmovies_now: allMovies}); 
        }
    }).sort({'genre': 1});
});
router.get('/now-showing/sort-by-Rating', function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            console.log('Sort by Averate rating');
            res.render('Now-showing.ejs', {allmovies_now: allMovies}); 
        }
    }).sort({'score': -1});
});



router.get("/Movie-Showtime/:id", function(req, res){
    movies.findById(req.params.id).populate(' comments').exec(function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            location.find({}, function(err, foundlocation){
                if(err){
                    console.log(err);
                }else{          
                    res.render("movie-showtime.ejs", {movie: foundCollection, foundlocation:foundlocation});
                }
            });
            
        }
    });

});

router.get('/movie-details/:id',function(req,res){
    movies.findById(req.params.id).populate(' comments').exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else{
            console.log('foundmovies-details');
            res.render('movie-details.ejs',{movie: foundMovie});
        }
    });
});


router.get('/Now-showing',function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            res.render('Now-showing.ejs', {allmovies_now: allMovies}); 
        }
    });
});
router.get('/coming-soon',function(req,res){
    moviesComingsoon.find({}, function(err,allmovies_comingsoon){
        if(err){
            console.log(err);
        }else{
            console.log('Found one-coming soon');
            res.render('coming-soon.ejs', {allmovies_coming: allmovies_comingsoon}); 
        }
    });
});  



router.get('/Movie-showtime/user/mypage', function(req, res){
    User.findById(req.user._id).populate('comments').populate('myfav').exec(function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            movies.find({}, function(err, foundmovie){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundCollection);
                    res.render('mypage.ejs', {movie:foundCollection, foundmovie:foundmovie});
                }
            })
            
        }
    });
});

router.get('/user/mypage', function(req,res){
    User.findById(req.user._id).populate('comments').populate('myfav').exec(function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            movies.find({}, function(err, foundmovie){
                if(err){
                    console.log(err);
                }else{
                    console.log(foundCollection);
                    res.render('mypage.ejs', {movie:foundCollection, foundmovie:foundmovie});
                }
            })
            
        }
    });
})


module.exports = router;