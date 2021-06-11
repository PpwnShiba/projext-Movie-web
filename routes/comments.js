const { text } = require('body-parser');

var express = require('express'),
    router  = express.Router({mergeParams: true}),
    movies = require('../models/movies'),
    Comment    = require('../models/comments'),
    middleware = require('../middleware'),
    User = require('../models/user');

router.get('/comment',middleware.isLoggedIn, function(req, res){
    movies.findById(req.params.id, function(err, foundCollection){
        if(err){
            console.log(err);
        } else {
            res.render("comments/show-comment.ejs", {collection: foundCollection});
        }
    });    
});

router.post('/show/:name', middleware.isLoggedIn, function(req, res){
    movies.findById(req.params.id, function(err, foundCollection){
        console.log(foundCollection);
        console.log(req.params.name);
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            User.findById(req.user._id, function(err, founduser){
                if(err){
                    console.log(err);
                }else{
                    console.log(founduser);
                    Comment.create({text:req.body.text}, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                            comment.author.id = req.user._id;
                            comment.author.username = req.user.username;
                            comment.movie.id = foundCollection;
                            comment.movie.name = req.params.name;
                            console.log(req.body.text);
                            comment.save();
                            foundCollection.comments.push(comment);
                            foundCollection.save();
                            founduser.comments.push(comment);
                            founduser.save();
                            console.log('add comment to movie complete');
                            res.redirect('/Movies/Movie-Showtime/'+ foundCollection._id);
                            
                        
                        }
                        
                    });
                }
            })
            
        }
    });
});
//edit
router.get('/:comment_id/edit-commet', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundcomment){
        if(err){
            res.redirect('back');
        }else{
            movies.findById(req.params.id, function(err, foundmovie){
                if(err){
                    console.log(err)
                }
                else{
                    res.render('comments/edit_comment.ejs', {collection_id: req.params.id, comment:foundcomment, movie:foundmovie});
                }
            });
        }
    })
})
router.put('/edit-comment/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedcomment){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/Movies/Movie-Showtime/'+req.params.id);
        }
    });

});

//delete
router.delete('/delete-comment/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect('/');
        }else{
            console.log(req.params.comment_id);
            User.findById(req.user._id, function(err, finduser){
                if(err){
                    console.log(err);
                    res.redirect('/');
                }
                else{
                    finduser.comments.pull(req.params.comment_id);
                    finduser.save();
                    console.log('Deleted complete');
                    res.redirect('/movies/Movie-Showtime/'+req.params.id);
                }
            });
          
        }
    });

});
module.exports = router;