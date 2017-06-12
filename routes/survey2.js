var express = require("express");
var router = express.Router();
var Destination = require("../models/destination");
var Comment = require("../models/comment");
var Survey2 = require("../models/survey2");
var middleware = require("../middleware");

//INDEX
router.get("/", middleware.isLoggedIn, function(req, res){
    Survey2.find({}, function(err, survey2){
        if(err){
            console.log(err);
        } else {
            res.render("survey2/index", {survey2: survey2});
        }
    });
});

//NEW
router.get("/new", function(req, res){
    res.render("survey2/new");
});
//CREATE
router.post("/", function(req, res){
    var firstname       = req.sanitize(req.body.survey2.firstname);
    var lastname        = req.sanitize(req.body.survey2.lastname);
    var addlnames       = req.sanitize(req.body.survey2.addlnames);
    var attending       = req.sanitize(req.body.survey2.attending);
    var attendingreply  = req.sanitize(req.body.survey2.attendingreply);
    var activities      = req.sanitize(req.body.survey2.activities);
    var moreactivities  = req.sanitize(req.body.survey2.moreactivities);

    var newSurvey2 = {firstname: firstname, lastname: lastname, addlnames: addlnames, attending: attending, attendingreply: attendingreply, activities: activities, moreactivities: moreactivities}
    Survey2.create(newSurvey2, function(err, newSurvey2){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Survey submitted succesfully. Thank you!");
            res.redirect("/");
        }
    })
})
//EDIT - takes me to edit survey page
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

module.exports = router;