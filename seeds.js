var mongoose = require("mongoose");
var Destination = require("./models/destination");
var Comment = require("./models/comment");
var data = [{
    location: "Cloud's Rest",
    image: "http://i.imgur.com/RW0Xv7G.jpg",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis felis semper, semper turpis vitae, ornare nulla. Sed faucibus nisl magna, vitae venenatis dolor consectetur ut. Proin vehicula accumsan lobortis. Nulla non arcu vel lorem sodales dignissim id ut nulla. Phasellus ornare et ex in posuere. Morbi ligula turpis, facilisis nec mauris a, accumsan lacinia orci.",
    submittedBy: "Robot Submitter",
    },
    {
    location: "Pinecone Valley",
    image: "http://i.imgur.com/3PL1Nag.jpg",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis felis semper, semper turpis vitae, ornare nulla. Sed faucibus nisl magna, vitae venenatis dolor consectetur ut. Proin vehicula accumsan lobortis. Nulla non arcu vel lorem sodales dignissim id ut nulla. Phasellus ornare et ex in posuere. Morbi ligula turpis, facilisis nec mauris a, accumsan lacinia orci.",
    submittedBy: "Robot Camper"
    }
];

function killDB(){
    //Remove all destinations
    Destination.remove({}, function(err){
        if(err){
            console.log(err)
        } else{
        console.log("Removed all destinations");
        }
    })
    Comment.remove({}, function(err){
        if(err){
            console.log(err)
        } else{
        console.log("Removed all comments");
        }
    });
};

function seedDB(){
    //Add some destinations
    data.forEach(function(seed){
    Destination.create(seed, function(err, destination){
        if(err){
            console.log(err);
        }else{
            console.log("Added destination");
            //Create comments
            Comment.create({
                text: "This is a great destination, but no internet connectivity",
                author: "Hikey Hikerson"
            }, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                destination.comments.push(comment);
                destination.save();
                console.log("created new comment");
                }
            });
        }
    });
    });
};


module.exports = {
    seedDB,
    killDB
}