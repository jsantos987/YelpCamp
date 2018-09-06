var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

// =================
// COMMENT ROUTES
// =================
// CREATE NEW COMMENT
router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
    // Find campground by ID so that NEW COMMENT FORM can be associated with campground.
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
            }
        })
});

router.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    //Lookup campground by ID to CONNECT new campground
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and ID to comment
                    comment.author.id = req.user_id;
                    comment.author.username = req.user.username;
                    req.user.username
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    // REDIRECT from new comment form to CAMPGROUND page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// Middelware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect("/login");
}

module.exports = router;

