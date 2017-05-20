var mongoose = require("mongoose");
var Destination = require("./models/destination");
var Comment = require("./models/comment");
var data = [{
    location: "Coral Springs Resort in Hurricane, UT",
    image: "http://i.imgur.com/U6CMIgl.jpg",
    body: "<li>15 Minutes from St. George Airport. 2 Hours from Las Vegas Airport. </li><li>Accommodations are 1, 2 and 3 bedroom suites</li><li>With fully stocked kitchens, and can be linked together with shared patio space.</li><li>We could likely get an entire floor of suites.</li><li>Pool and spa on site</li><li> Golf, Hiking or horse tours through Zion National Park</li><li>Zip Lining, Shopping, dining and movies in St. George</li><li>Boating/ fishing, ATV sand dunes</li><li>Wakeboard park</li>",
    url: "https://coralspringsresort.com/",
    submittedBy: "Francie",
    },
    {
    location: "Jackson Hole, WY",
    image: "http://i.imgur.com/xP7Dj6W.jpg",
    body: "<li>Multiple home rentals within same community.</li><li>Fly into Jackson Hole Airport Accommodations are 4 and 5 bedroom lodges</li><li>We would book multiple within walking distance in the same community. </li><li>Fishing, Hiking, Golf, Rafting, Mountain bike tours</li><li>Shopping, dining and movies in Jackson Hole</li><li>Grand Teton National Park</li><li>90 Minutes from Yellowstone (another 45 min. to Old Faithful)</li>",
    submittedBy: "Francie",
    url: "https://www.jacksonhole.com/"
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