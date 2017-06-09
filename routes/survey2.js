var express = require("express");
var router = express.Router();
var Destination = require("../models/destination");
var Comment = require("../models/comment");
var Survey2 = require("../models/survey2");
var middleware = require("../middleware");

//NEED TO UPDATE TO BE SURVEY2 SPECIFIC. FIGURE OUT {survey2: survey2 nonsense}
router.get("/new",middleware.isLoggedIn, function(req, res){
    Survey2.findById(req.params.id, function(err, survey2){
        if(err){
            console.log(err);
        }else {
    res.render("survey2", {survey2: survey2});
        }
    })
});
//CREATE
router.post("/", function(req, res){
    var firstname = req.sanitize(req.body.survey2.firstname);
    var lastname = req.sanitize(req.body.survey2.lastname);
    var addlnames = req.sanitize(req.body.survey2.addlnames);
    var attending = req.sanitize(req.body.survey2.attending);
    var attendingreply = req.sanitize(req.body.survey2.attendingreply);
    var activities = req.sanitize(req.body.survey2.activities);
    var moreactivities = req.sanitize(req.body.survey2.moreactivities);

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
//EDIT
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comment_id, function(err, foundComment){
//         if(err){
//             res.redirect("back");
//         } else {
//     res.render("comments/edit", {destination_id: req.params.id, comment: foundComment});
//         }
//     })
// })
// //UPDATE
// router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.redirect("/destinations/" + req.params.id);
//         }
//     })

// })
// //DELETE
// router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndRemove(req.params.comment_id, function(err){
//         if(err){
//             res.redirect("back")
//         } else {
//             res.redirect("/destinations/" + req.params.id);
//         }
//     })
// })

module.exports = router;