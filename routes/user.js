const reserve = require('../models/reserve');

var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    middleware = require('../middleware'),
    movies = require('../models/movies'),
    comments = require('../models/comments'),

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

    upload  = multer({storage: storage, fileFilter: imageFilter});

router.get('/myfav/:id/:name',middleware.isLoggedIn,function(req,res){
    movies.findById(req.params.id, function(err, foundmovie){
        if(err){
            console.log(err);
        }else{
            User.findById(req.user._id, function(err, founduser){
                if(err){
                    console.log(err);
                }else{
                
                    founduser.myfav.name = req.params.name;
                    founduser.myfav.push(foundmovie);
                    founduser.save();
                    console.log('added to favorite complete');
                    res.redirect('/');
                }
            });
        }
    });
});
router.delete('/delete-favorite/:favorite_id', function(req, res){
   
    User.findById(req.user._id, function(err, founduser){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            founduser.myfav.pull(req.params.favorite_id);
            founduser.save();
            console.log('Deleted favorite complete');
            res.redirect('/user/mypage');
        }
    });
});
        


      
router.post('/edit-picture',  upload.single('picture_profile'),function(req,res){
    if(req.file){
        req.body.picture_profile = '/uploads/'+ req.file.filename;
    }
    User.findByIdAndUpdate(req.user._id,{profile:req.body.picture_profile} , function(err, founduser){
        if(err){
            res.redirect('/user/mypage');
        }else{
            console.log('edit profile complete');
            res.redirect('/user/mypage'); 
        }
    });
});
router.get('/mypage',function(req, res){
    User.findById(req.user._id).populate('comments').populate('myfav').exec(function(err, foundCollection){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            movies.find({}, function(err, foundmovie){
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