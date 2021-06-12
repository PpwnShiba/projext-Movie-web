const seat = require('../models/seat');

var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Movies = require('../models/movies'),
    moviecomingsoon = require('../models/movies_comingsoon'),
    Theater = require('../models/location'),

    multer = require('multer'),
    middleware = require('../middleware'),
    path = require('path');

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

  upload  = multer({storage: storage, fileFilter: imageFilter}),
  

//admin page
router.get('/', function(req,res){
    Movies.find({}, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            moviecomingsoon.find({}, function(err, allmoviescoming){
                if(err){
                    console.log(err);
                }else{
                    console.log('admin page');
                    res.render('admin/admin.ejs', {allmovies_now: allMovies, allmovies_comingsoon: allmoviescoming}); 
                }
            });
           
        }
    });
});
//cinema page
router.get('/cinema', function(req, res){
    Theater.find({}, function(err, allcinema){
        if(err){
            console.log(err);
        }else{
            Movies.find({}, function(err, allmovies){
                if(err){
                    console.log(err);
                }
                else{
                    console.log('all cinema on admin page');
                    res.render('admin/cinema-admin.ejs', {allcinema:allcinema, allmovies:allmovies});
                }
            })
            
        }
    })
})


//delete theater in this cinema
router.delete('/delete-theater/:id_location/:theater', function(req, res){
    Theater.findByIdAndUpdate(req.params.id_location, { $pull: { theater:{_id:req.params.theater} } }, function(err, found){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Deleted theater complete');
            res.redirect('/admin/add-theater/'+req.params.id_location);
        }
    });
    
});

//add theater to cinema
router.get('/add-theater/:id_location', function(req, res){
    Theater.findById(req.params.id_location).populate('theater').exec(function(err, foundtheater){
        if(err){
            console.log(err);
        }else{
            console.log('Found cinema and add theater plz');  
            res.render('admin/add-theater.ejs', {foundcinema: foundtheater});
            
        }
    });
 
});
router.post('/add-theater/:id_location', function(req, res){
    Theater.findById(req.params.id_location, function(err, foundlocation){
        if(err){
            console.log(err);
        }else{
            seat.create({theater:req.body.addtheater}, function(err, foundseats){
                if(err){
                    console.log(err);
                }else{
                    foundlocation.theater.push({name:req.body.addtheater, seats:foundseats});
                    foundlocation.save();
                    console.log('Added theater completed');
                    req.flash('success', 'Added theater complete');
                    res.redirect('/admin/add-theater/'+req.params.id_location);
                }
            });
            
        }
           
    });
});


//add cinema
router.post('/add-cinema', upload.single('logo'), function(req, res){
    req.body.addcinema.logo = '/uploads/'+req.file.filename;
    Theater.create(req.body.addcinema, function(err, cinema){
        if(err){
            console.log(err);
        }
        else{
            console.log('upload cinema completed');
            req.flash('success', 'Added cinema complete');
            res.redirect('/admin');
        }
    });
});
//delete cinema
router.delete('/delete/cinema/:id_location', function(req, res){
    Theater.findByIdAndRemove(req.params.id_location, function(err, found){
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Deleted cinema complete');
            res.redirect('/admin');
        }
    });
    
});

//add movie to now showing
router.post('/add-movies',upload.fields([{name:'poster'},{name:'header'}]), function(req,res){
    req.body.addmov.image = '/uploads/'+req.files['poster'][0].filename;
    req.body.addmov.header = '/uploads/'+req.files['header'][0].filename;
    Movies.create(req.body.addmov, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            console.log('upload movie completed');
            req.flash('success', 'Uploaded movie complete');
            res.redirect('/admin');
        }
    });
});
// add movie to comingsoon
router.post('/add-movies/comingsoon',upload.fields([{name:'poster'},{name:'header'}]), function(req,res){
    req.body.addmov.image = '/uploads/'+req.files['poster'][0].filename;
    req.body.addmov.header = '/uploads/'+req.files['header'][0].filename;
    moviecomingsoon.create(req.body.addmov, function(err, allMovies){
        if(err){
            console.log(err);
        }else{
            console.log('upload movie completed');
            req.flash('success', 'Uploaded movie complete');
            res.redirect('/admin');
        }
    });
});
//edit movie
router.get('/edit/:id', function(req,res){
    Movies.findById(req.params.id, function(err, foundinfo){
        if(err){
            console.log(err);
        }else{
           
            res.render("admin/edit.ejs", {allmovies_now: foundinfo});
        }
    });
});
router.get('/edit/comingsoon/:id', function(req,res){
    moviecomingsoon.findById(req.params.id, function(err, foundinfo){
        if(err){
            console.log(err);
        }else{
           
            res.render("admin/edit-coming.ejs", {allmovies_now: foundinfo});
        }
    });
});
//update information now showing
router.put('/:id', upload.fields([{name:'poster'},{name:'header'}]), function(req, res){
    //check user upload image or not?
    if(req.files['poster']){
        console.log(req.files['poster']);
        req.body.addmov.image = '/uploads/'+req.files['poster'][0].filename;
    }
    if(req.files['header']){
        console.log(req.files['header']);
        req.body.addmov.header = '/uploads/'+req.files['header'][0].filename;
    }
    Movies.findByIdAndUpdate(req.params.id, req.body.addmov,function(err, updatedinfo){
        if(err){
            res.redirect('/admin');
        }else{
            console.log('edit completed and updated');
            req.flash('success', 'Edited complete');
            res.redirect('/admin');
        }
    });
});
//update information coming soon
router.put('/comingsoon/:id', upload.fields([{name:'poster'},{name:'header'}]), function(req, res){
    //check user upload image or not?
    if(req.files['poster']){
        console.log(req.files['poster']);
        req.body.addmov.image = '/uploads/'+req.files['poster'][0].filename;
    }
    if(req.files['header']){
        console.log(req.files['header']);
        req.body.addmov.header = '/uploads/'+req.files['header'][0].filename;
    }
    moviecomingsoon.findByIdAndUpdate(req.params.id, req.body.addmov,function(err, updatedinfo){
        if(err){
            res.redirect('/admin');
        }else{
            console.log('edit completed and updated');
            req.flash('success', 'Edited complete');
            res.redirect('/admin');
        }
    });
});


//delete movie in now showing
router.delete('/delete/:id', function(req, res){
    
    Movies.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            console.log("delete completed");
            req.flash('success', 'Deleted complete');
            res.redirect('/admin');
        }
    });
});
//delete movie in coming soon
router.delete('/delete/comingsoon/:id', function(req, res){
    
    moviecomingsoon.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            console.log("delete completed");
            req.flash('success', 'Deleted complete');
            res.redirect('/admin');
        }
    });
});


module.exports = router;