var express = require("express"),
    router  = express.Router(),
    Destination = require("../models/destination"),
    middleware = require("../middleware"),
    Forum       = require("../models/forum");


//Forum ROUTES
//INDEX
router.get("/", function(req, res){
    Forum.find({}, function(err, forum){
        if(err){
            console.log(err);
        } else {
            res.render("forum/index", {forum: forum});
        }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("forum/new");
});
//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    // req.body.destination.body = req.sanitize(req.body.destination.body);
    var title = req.sanitize(req.body.forum.title);
    var body = req.sanitize(req.body.forum.body);
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newForum = {title: title, body: body, author: author}
    Forum.create(newForum, function(err, newForum){
        if(err){
            console.log(err);
        } else {
            res.redirect("/forum");
        }
    })
})
// //SHOW
router.get("/:id", function(req, res){
    Forum.findById(req.params.id).populate("comments").exec(function(err, foundForum){
        if(err){
            console.log(err);
            res.redirect("/forum");
        }else {
            res.render("forum/show", {forum: foundForum});
        }
    })
});
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

module.exports = router;