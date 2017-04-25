var express = require('express'),
    app = express(),
    mongoose = require("mongoose")
    bodyParser = require("body-parser")
    methodOverride = require("method-override");


//CONFIG
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/blog_site");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var destinationSchema = new mongoose.Schema({
    Location: String,
    image: String,
    body: String,
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
    // Destination.find({}, function(err, destinations){
    //     if(err){
    //         console.log("Error!");
    //     } else {
    //         res.render("destinations", {destinations: destinations});
    //     }
    // });
    res.render("destinations");
});

//RESTFUL ROUTES
//NEW
//CREATE
//SHOW
//EDIT
//UPDATE
//DESTROY

app.listen(3000, function(req, res){
    console.log("Family Server Started");
});
