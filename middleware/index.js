//All MIDDLEWARE goes here
var middlewareObj = {};
var Destination = require("../models/destination");
var Comment = require("../models/comment");

middlewareObj.checkDestinationOwnership = function (req, res, next){
    if(req.isAuthenticated()){
    Destination.findById(req.params.id, function(err, foundDestination){
        if(err){
            req.flash("error", "Issue finding destination in database")
            res.redirect("/destinations");
        } else{
            if(foundDestination.author.id.equals(req.user._id)) {
                next();
            } else{
                req.flash("error", "You can only edit your own destinations")
                res.redirect("/destinations");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/destinations");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Issue finding comment in database");
            res.redirect("back");
        } else{
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else{
                req.flash("error", "You can only edit your own comments");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;