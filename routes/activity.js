var express         = require("express"),
    router          = express.Router(),
    middleware      = require("../middleware"),
    Activity        = require("../models/activity");

//INDEX
router.get('/', function(req, res){
    Activity.find({}, function(err, activity){
        if(err){
            console.log(err);
        } else {
            res.render('activity/index', {activity: activity});
        }
    })
})
//NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('activity/new');
})
//CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    var activity = req.sanitize(req.body.activity.activity);
    var image = req.sanitize(req.body.activity.image);
    var providerUrl = req.sanitize(req.body.activity.providerUrl);
    var description = req.sanitize(req.body.activity.description);
    var attending = req.sanitize(req.body.activity.attending);
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newActivity = {activity: activity, image: image, providerUrl: providerUrl, description: description, attending: attending, author: author}
    Activity.create(newActivity, function(err, newActivity){
        if(err){
            console.log(err);
        } else {
            res.redirect('/activity')
        }
    })
})

module.exports = router;