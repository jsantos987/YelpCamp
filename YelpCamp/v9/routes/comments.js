var express         = require("express");
var router          = express.Router({mergeParams: true}); 
//then replace all `app` with `router`
//mergeParams: true used to merge params from campground & comments together
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middleware      = require('../middleware'); 
//don't need to add 'index.js' to var middleware; requiring a directory will automatically require the contents of index.js
//now must add middleware. to functions below. i.e. middleware.isLoggedIn, etc.


//Comments.new
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); //name of the template - new.ejs
        }
    });
});


//Comments.create
router.post("/", middleware.isLoggedIn, function(req, res){
   //lookup campground by id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } else {  //create new comment
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                //add username + id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                //connect new comment to campground
                campground.comments.push(comment);
                campground.save();
                //redirect to campground's SHOW page
                res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});

//COMMENTS Edit Route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id:req.params.id, comment:foundComment});
        }
    });
});

//COMMENTS Update Route
router.put('/:comment_id', function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//COMMENTS Destroy Route
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


module.exports = router;