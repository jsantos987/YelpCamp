
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Zeke is chubby sausge",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// The following methods use the Passpot Local module.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
   res.render("landing"); 
});


// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});


// CREATE route - add new campground to DB
app.post("/campgrounds", function(req, res){
    // get data from from add to campgroungs array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });

});


// NEW - show form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// =================
// COMMENTS ROUTES
// =================

// CREATE NEW COMMENT
app.get("/campgrounds/:id/comments/new", function(req, res){
    // Find campground by ID so that NEW COMMENT FORM can be associated with campground.
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
            }
        })
});

app.post("/campgrounds/:id/comments", function(req, res){
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
                    campground.comments.push(comment);
                    campground.save();
                    // REDIRECT from new comment form to CAMPGROUND page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


// =======================
// AUTHENTICATION ROUTES
// =======================

//SHOW REGISTER FORM
app.get("/register", function(req, res){
    res.render("register");
});
// HANDLE SIGN UP LOGIC
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


// SHOW LOGIN FORM
app.get("/login", function(req, res){
    res.render("login");
});
// HANDLING LOGIN LOGIC
// Passport Middleware
app.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res){
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});