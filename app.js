var express = require('express'),
    app = express(),
    mongoose = require("mongoose")
    bodyParser = require("body-parser")
    methodOverride = require("method-override");


//CONFIG
app.use(express.static('public'));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/reunion_site");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var destinationSchema = new mongoose.Schema({
    location: String,
    url: String,
    body: String,
    submittedBy: String,
    created: {type: Date, default: Date.now}
});
var Destination = mongoose.model("Destination", destinationSchema);

app.get("/", function(req, res){
    res.render('index');
});
app.get("/event-details", function(req, res){
    res.render('event-details');
});

app.get("/photos", function(req, res){
    res.render('photos');
});
app.get("/guestbook", function(req, res){
    res.render('guestbook');
});
app.get("/rsvp", function(req, res){
    res.render('rsvp');
});
app.get("/signup", function(req, res){
    res.render('signup');
});

app.get("/destinations", function(req, res){
    Destination.find({}, function(err, destinations){
        if(err){
            console.log("Error!");
        } else {
            res.render("destinations", {destinations: destinations});
        }
    });
});

//RESTFUL ROUTES DESTINATIONS
//NEW
app.get("/destinations/new", function(req, res){
    res.render("newdestination");
});
//CREATE
app.post("/destinations", function(req, res){
    Destination.create(req.body.destination, function(err, newDestination){
        if(err){
            console.log("Error creating destination");
        } else {
            res.redirect("/destinations");
        }
    })
})
//SHOW
app.get("/destinations/:id", function(req, res){
    Destination.findById(req.params.id, function(err, foundDestination){
        if(err){
            res.redirect("/destinations");
        }else {
            res.render("showdestination", {destination: foundDestination});
        }
    })
});
//EDIT - takes me to edit destinations page
app.get("/destinations/:id/edit", function(req, res){
    //get ID and put in url
    Destination.findById(req.params.id, function(err, foundDestination){
        if(err){
            res.redirect("/destinations");
        } else {
            res.render("editdestination", {destination: foundDestination});
        }
    })
    //prepopulate forms
});
//UPDATE
//DESTROY

app.listen(3000, function(req, res){
    console.log("Family Server Started");
});
