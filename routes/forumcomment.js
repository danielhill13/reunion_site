var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var Forum = require("../models/forum");
var ForumComment = require("../models/forumcomment");

router.get("/new", middleware.isLoggedIn,function(req, res){
    Forum.findById(req.params.id, function(err, forum){
        if(err){
            console.log(err);
        }else {
    res.render("forum/newcomment", {forum: forum});
        }
    })
});
//CREATE
router.post("/",  middleware.isLoggedIn, function(req, res){
    Forum.findById(req.params.id, function(err, forum){
        if(err){
            console.log(err);
            res.redirect("/forum");
        } else {
            //create new comment
            // req.body.comment = req.sanitize(req.body.comment);
            ForumComment.create(req.body.forumcomment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.text = req.body.forumComment.text;
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    forum.comments.push(comment);
                    forum.save();
                    console.log(comment);
                    res.redirect("/forum/" + forum._id);
    }})}})})
// //EDIT
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     ForumComment.findById(req.params.comment_id, function(err, foundComment){
//         if(err){
//             res.redirect("back");
//         } else {
//     res.render("comments/edit", {forum_id: req.params.id, comment: foundComment});
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