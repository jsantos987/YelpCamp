var express = require("express");
var router = express.Router(); //router was undefined. then replace all 'app' with 'router'
var passport = require("passport"); //passport was not defined
var User = require("../models/user"); //User was not defined

//ROOT route
router.get("/", function(req, res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", function(req, res){
    passport.authenticate("local", 
    { 
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        successFlash: "Welcome " + req.body.username + "!"
    })(req, res); //don't neccessarily need this empty callback, but just for clarification 
});


//logout route
router.get("/logout", function(req, res){
    req.logout(); //comes with packages we have installed
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;