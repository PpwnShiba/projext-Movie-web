var Collection = require('../models/movies'),
    Comment = require('../models/comments');
 
var middlewareObj = {};

middlewareObj.checkCollectionOwner = function(req, res, next){
    //login
    // if(req.isAuthenticated()){
        Collection.findById(req.params.id, function(err, found){
            if(err){
                req.flash('error', 'Collectio not found!!');
                res.redirect('back');
            }else{
                // if(found.author.id.equals(req.user._id)){
                next();
                console.log('delete completed');
               
                // }else{
                //     res.redirect('back');
                // }
            }
        });
    // }else{ //no login
    //     res.rendirect('back');
    // }
}


middlewareObj.checkCommentOwner = function(req, res, next){
    //login
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, found){
            if(err){
                res.redirect('back');
            }else{
                if(found.author.id.equals(req.user._id)){
                    next();
           
                }else{
                    res.redirect('back');
                }
            }
        });
    }else{ //no login
        res.rendirect('back');
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first!!');
    res.redirect('/');
}

module.exports = middlewareObj;