var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index");

//show register form
router.get("/register", function(req, res){
    res.render("register");
})
//handle signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
           req.flash("error", err.message);
           return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Hill Family Reunion Site " + user.username + "!");
            res.redirect("/destinations");
        })
    })
})
//show login form
router.get("/login", function (req, res){
    res.render("login");
})
//login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function (req, res){
})
//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/");
})

//View your profile
router.get("/profile", function(req, res){
    res.render("profile");
})
//EDIT edit profile
router.get("/profileupdate", middleware.isLoggedIn, function(req, res){
    res.render("profileupdate");
})

//UPDATE profile
// router.put("/:id", middleware.checkDestinationOwnership, function(req, res){
//     Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination){
//         if(err){
//             res.redirect("/destinations");
//         } else {
//             res.redirect("/destinations/" + req.params.id);
//         }
//     });
// });

module.exports = router;