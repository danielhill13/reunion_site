// var express = require("express"),
//     router  = express.Router(),
//     Destination = require("../models/destination"),
//     middleware = require("../middleware");


//DESTINATIONS ROUTES
//INDEX
// router.get("/", function(req, res){
//     Destination.find({}, function(err, destinations){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("destinations/index", {destinations: destinations});
//         }
//     });
// });

//NEW
// router.get("/new", middleware.isLoggedIn, function(req, res){
//     res.render("destinations/new");
// });
//CREATE
// router.post("/", middleware.isLoggedIn, function(req, res){
//     // req.body.destination.body = req.sanitize(req.body.destination.body);
//     var location = req.sanitize(req.body.destination.location);
//     var image = req.sanitize(req.body.destination.image);
//     var url = req.sanitize(req.body.destination.url);
//     var body = req.sanitize(req.body.destination.body);
//     var author = {
//         id: req.user._id,
//         username: req.user.username
//     }
//     var newDestination = {location: location, image: image, url: url, body: body, author: author}
//     Destination.create(newDestination, function(err, newDestination){
//         if(err){
//             console.log(err);
//         } else {
//             res.redirect("/destinations");
//         }
//     })
// })
// //SHOW
// router.get("/:id", function(req, res){
//     Destination.findById(req.params.id).populate("comments").exec(function(err, foundDestination){
//         if(err){
//             console.log(err);
//             res.redirect("/destinations");
//         }else {
//             res.render("destinations/show", {destination: foundDestination});
//         }
//     })
// });
//EDIT - takes me to edit destinations page
// router.get("/:id/edit", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findById(req.params.id, function(err, foundDestination){
//         res.render("destinations/edit", {destination: foundDestination});
//         });
//     });
//UPDATE
// router.put("/:id", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination){
//         if(err){
//             res.redirect("/destinations");
//         } else {
//             res.redirect("/destinations/" + req.params.id);
//         }
//     });
// });
//DESTROY
// router.delete("/:id", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             console.log("Issue deleting object");
//             res.redirect("/destinations");
//         } else{
//             res.redirect("/destinations");
//         }
//     })
// });

// module.exports = router;