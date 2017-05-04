var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require('express-sanitizer')
    Destination = require("./models/destination"),
    Comment = require("./models/comment"),
    refreshDB = require("./seeds");



//CONFIG
mongoose.connect("mongodb://localhost/reunion_site");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

app.get("/", function(req, res){
    res.render('index');
});

refreshDB.killDB();
refreshDB.seedDB();


//DESTINATIONS ROUTES
//INDEX
app.get("/destinations", function(req, res){
    Destination.find({}, function(err, destinations){
        if(err){
            console.log("Error!");
        } else {
            res.render("destinations/index", {destinations: destinations});
        }
    });
});

//NEW
app.get("/destinations/new", function(req, res){
    res.render("destinations/new");
});
//CREATE
app.post("/destinations", function(req, res){
    req.body.destination.body = req.sanitize(req.body.destination.body);
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
    Destination.findById(req.params.id).populate("comments").exec(function(err, foundDestination){
        if(err){
            console.log(err);
            res.redirect("/destinations");
        }else {
            res.render("destinations/show", {destination: foundDestination});
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
            res.render("destinations/edit", {destination: foundDestination});
        }
    })
    //prepopulate forms
});
//UPDATE
app.put("/destinations/:id", function(req, res){
    req.body.destination.body = req.sanitize(req.body.destination.body);

    Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination){
        if(err){
            console.log("Error Updating Destination");
            res.redirect("/destinations");
        } else {
            res.redirect("/destinations/" + req.params.id);
        }
    });
});
//DESTROY
app.delete("/destinations/:id", function(req, res){
    Destination.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Issue deleting object");
            res.redirect("/destinations");
        } else{
            res.redirect("/destinations");
        }
    })
});

//=================
// COMMENT ROUTES
//=================
//NEW
app.get("/destinations/:id/comments/new", function(req, res){
    Destination.findById(req.params.id, function(err, destination){
        if(err){
            console.log(err);
        }else {
    res.render("comments/new", {destination: destination});
        }
    })
});
//CREATE
app.post("/destinations/:id/comments", function(req, res){
    Destination.findById(req.params.id, function(err, destination){
        if(err){
            console.log(err);
            res.redirect("/destinations");
        } else {
            //create new comment
            // req.body.comment = req.sanitize(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    destination.comments.push(comment);
                    destination.save();
                    res.redirect("/destinations/" + destination._id);
    }})}})})




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


app.listen(3000, function(req, res){
    console.log("Family Server Started");
});
