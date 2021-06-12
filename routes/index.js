
var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    movies = require('../models/movies'),
    moviescomingsoon = require('../models/movies_comingsoon'),
    multer = require('multer'),
    middleware = require('../middleware'),
    path = require('path'),

    storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null,'./public/uploads/');
        },
        filename: function(req, file, callback){
              callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
        }
    }),
    imageFilter = function(req, file, callback){
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
          return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
      }
      callback(null, true);
    },

  upload  = multer({storage: storage, fileFilter: imageFilter});

router.get('/',function(req,res){
    movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            moviescomingsoon.find({}, function(err, allmovies_coming){
                if(err){
                    console.log(err);
                }else{
                    res.render('Home.ejs', {allmovies_now: allMovies, allmovies_comingsoon:allmovies_coming}); 
                }
            });
        }
        
    });
});


router.get('/register', function(req, res){
    res.render('home.ejs');
});

router.post('/register', upload.single('picture_profile'), function(req, res){

    req.body.picture_profile = '/uploads/'+req.file.filename;

    var newUser = new User({username: req.body.username, email: req.body.email, name: req.body.name, surename: req.body.surename, profile:req.body.picture_profile});
    if(req.body.admincode === 'topsecret'){
        newUser.IsAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash('error', 'err.message');
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to Godzilla Theater '+user.username);
            res.redirect('/');
        })
    })
})


router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully log in, Welcome to Godzilla Theater',
        failureFlash: 'Invalid username or password please try again'
    }), function(req, res){  
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Logged out successly');
    res.redirect('/');
});

module.exports = router;