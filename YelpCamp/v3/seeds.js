var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://recreation-acm.activefederal.com/assetfactory.aspx?did=5221",
        description: "blah, blah, blah, blah, blah, blah"
    },
    {
        name: "Canyon Floor",
        image: "https://media.istockphoto.com/photos/man-is-sitting-around-a-campfire-and-just-relaxing-picture-id628138888?k=6&m=628138888&s=612x612&w=0&h=eMrwzfCsZasvXqmxCsR_MFhtKLGtmr6tEViBjlLW4cw=",
        description: "blah, blah, blah, blah, blah, blah"
    },
    {
        name: "Treasure Peak",
        image: "http://www.wildnatureimages.com/images%203/060731-346..jpg",
        description: "blah, blah, blah, blah, blah, blah"
    }
    
]

function seedDB(){
    // Remove All Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
            // add a few campgounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish it had internet",
                                author: "Hommer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                        }
                    });
                });
        });
}
module.exports = seedDB;

