var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index");
var async               = require('async');
var crypto              = require('crypto');
var nodemailer          = require('nodemailer');

//show register form
router.get("/register", function(req, res){
    res.render("user/register");
})
//handle signup logic
router.post("/register", function(req, res){
    var lowercaseUser = req.body.username.toLowerCase();
    var newUser = new User({username: lowercaseUser, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
           req.flash("error", err.message);
           return res.render("user/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the Hill Family Reunion Site " + user.username + "!");
            res.redirect("/destinations");
        })
    })
})
//show login form
router.get("/login", function (req, res){
    res.render("user/login");
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
    res.render("user/profile");
})
//EDIT edit profile
router.get("/profileupdate", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
    res.render("user/profileupdate", {user: foundUser});
    })
})

//UPDATE profile
router.put("/profileupdate/:id", middleware.isLoggedIn, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            console.log("Error updating profile");
            res.redirect("/profile");
        } else {
            req.flash("success", "Profile updated successfully");
            res.redirect("/");
        }
    })
})

//FORGOT PASSWORD
router.get('/forgotpassword', function(req, res){
    res.render('user/forgotpassword');
})

//Generate token route
//Need to use crypto generation instead of Math.random
// router.post('/forgotpassword', function(req, res, next){
//     var token = Math.random() * 7534095;
//     User.findOne({username: req.body.username }, function(err, user){
//         if (!user) {
//             req.flash('error', 'No account with that email address exists.');
//             res.redirect('/');
//         } else {
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//         user.save();
//         res.redirect('/');
//         }
//     })
// })


router.post('/forgotpassword', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgotpassword');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    // function(token, user, done) {
    //   var smtpTransport = nodemailer.createTransport('SMTP', {
    //     service: 'Mailgun',
    //     auth: {
    //       user: '!!! YOUR SENDGRID USERNAME !!!',
    //       pass: '!!! YOUR SENDGRID PASSWORD !!!'
    //     }
    //   });
    //   var mailOptions = {
    //     to: user.email,
    //     from: 'passwordreset@demo.com',
    //     subject: 'Node.js Password Reset',
    //     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    //       'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
    //       'http://' + req.headers.host + '/reset/' + token + '\n\n' +
    //       'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    //   };
    //   smtpTransport.sendMail(mailOptions, function(err) {
    //     req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
    //     done(err, 'done');
    //   });
    // }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgotpassword');
  });
});
//NEED TO BUILD AND SEND EMAIL HERE

//NEED TO ADD ROUTES FOR ACTUAL PASSWORD RESET




module.exports = router;