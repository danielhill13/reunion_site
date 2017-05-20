var express = require("express");
var router = express.Router({mergeParams: true});
var Destination = require("../models/destination");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn, function(req, res){
    Destination.findById(req.params.id, function(err, destination){
        if(err){
            console.log(err);
        }else {
    res.render("comments/new", {destination: destination});
        }
    })
});
//CREATE
router.post("/",  middleware.isLoggedIn, function(req, res){
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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    destination.comments.push(comment);
                    destination.save();
                    console.log(comment);
                    res.redirect("/destinations/" + destination._id);
    }})}})})
//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
    res.render("comments/edit", {destination_id: req.params.id, comment: foundComment});
        }
    })
})
//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/destinations/" + req.params.id);
        }
    })

})
//DELETE
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/destinations/" + req.params.id);
        }
    })
})

module.exports = router;