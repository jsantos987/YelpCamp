var express         = require("express");
var router          = express.Router(); //then replace all `app` with `router`
var Campground      = require("../models/campground");
var middleware      = require('../middleware'); 
//don't need to add 'index.js' to var middleware; requiring a directory will automatically require the contents of index.js
//now must add middleware. to functions below. i.e. middleware.isLoggedIn, etc.

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});
    // res.render("campgrounds",{campgrounds: campgrounds}); //name: data

//CREATE - add new campgrounds to db
router.post("/", middleware.isLoggedIn, function(req, res){ //making new campground
//same as GET route, but this is POST, so it works, but SHOULD be same to keep simple, and is a common format called REST
    // res.send("You hit the post route."); //test w/ Postman
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    //campgrounds.push(newCampground);
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
                res.redirect("/campgrounds");
        }
    });
//get data from form, add to campgrounds array
}); 

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){ //page with form
   res.render("campgrounds/new"); 
});

//SHOW - show info about campground; :id url's must be coded last
router.get("/:id", function(req, res){
    //find campground w/ provided ID; retrieves from auto-assign by mongo
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    //finding campground by ID, populating "comments" of same ID to that, executing 
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
        //render show template w/ that campground
        res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
   }); //don't need to handle error, as it's handled in checkCampgroundOwnership
});

//UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find + update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//DESTROY Campground route
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;