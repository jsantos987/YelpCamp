var Campground = require('../models/campground');
var Comment = require('../models/comment');
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){    
    //is user logged in
    if(req.isAuthenticated()){
       Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); //move on to next function; i.e. edit, delete, etc.
                } else {
                    //if not, redirect
                    res.redirect("back");
                }
            }
        }); 
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next(); //move on to next function; i.e. edit, delete, etc.
                } else {
                    //if not, redirect
                    res.redirect("back");
                }
            }
        }); 
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){ 
    if(req.isAuthenticated()){
        return next(); 
    } 
    res.redirect('/login');
}


module.exports = middlewareObj