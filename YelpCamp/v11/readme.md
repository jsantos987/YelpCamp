
#YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds


Each Campground has:
	* Name
	* Image
	

#Layout and Basic Styling
* Create out header and footer partials
* Add in Bootstrap

#Add Mongoose
* Install and configure Mongoose
* Setup campground model
*  Use campground model inside of our routes

#Show Page
* Review the RESTful routes we've seen so far
*  Add description to our campground model
*   Show db.collection.drop()
*   Add a show route/template

RESTFUL ROUTES

<!------------------------------------
name---url/path/--VERB--Desc.
====================================================
INDEX /dogs      GET   Display a list of all dog
NEW   /dogs/new  GET   Dispays form to make a new dog
CREATE /dogs     POST  Add new dog to DB
SHOW  /dogs/:id  GET   Shows more info about one dog
---------------------------------------->

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!


#Add seed File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add th Comment Model!!!
* Make our errors go away!!!
* Associate comments with campground show page


=============================
v5
=============================
#Comment New/Create
* Discuss nested routes
* Add the commetn new and create routes
* add the new comment form


#Style Show Page
* Add sidebar to show page
* Display comments nicely

=============================
v6
=============================
# Finish Styling Show Page
* Add public directory
* Add custom stylesheet
* 
# Add user model
* Install all packages needed for auth
*  Define User model


# Authentication - Register
* Configure Passport
* Add register routes
* Add register template

=============================
v7
=============================
# Auth cont. Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links in navaar correctly
* Reorginize all routes with EXPRESS ROUTER ***


=============================
v8
=============================
# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent unauthorized user from creating campground. Must be logged in.
* Save username+id to newly created campground


=============================
v9
=============================
# Editing Campgrounds
* Add Method-Override (PUT Request to update)
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add update Route
* Fix $set problem
* User can only edit his/her campgrounds
* User can only delete his/her campgounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit Button
* Add Update route
* 

<!--/campgrounds/:id/edit -->
<!--/campgrounds/:id/comments/:comment_id/edit -->

# Deleting Comments
* Add Destroy route
* Add Delete button

# Refactor middleware 
* Create middleware directory and index file
* Copy middleware code to middleware index.js
* add middleware require to routes files


=============================
v10
=============================

=============================
v11
=============================
# Update Landing Page Style
 * Create and landing.css
 * Add style and images list
# Add older browser support (add entry to landing.css 

=============================