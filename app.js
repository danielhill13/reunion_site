var express             = require('express'),
    app                 = express(),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require('express-sanitizer')
    Destination         = require("./models/destination"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    Survey2             = require("./models/survey2");

//Routes Requires
var commentRoutes       = require("./routes/comments"),
    destinationRoutes   = require("./routes/destinations"),
    indexRoutes         = require("./routes/index"),
    survey2Routes       = require("./routes/survey2"),
    forumRoutes         = require("./routes/forum");

//CONFIG
var dbUrl = process.env.DATABASEURL || "mongodb://localhost/reunion_site";
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "this is a secret thing for my passport family reunion site",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//THIS PASSES LOGGED IN USER TO ALL ROUTES
//MUST BE BELOW PASSPORT CONFIG ABOVE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/", function(req, res){
    res.render('index');
});
app.get("/event-details", function(req, res){
    res.render('event-details');
});
app.get("/photos", function(req, res){
    res.render('photos');
});
app.get("/login", function(req, res){
    res.render('login');
});
app.get("/signup", function(req, res){
    res.render('register');
});
// app.get("/survey2", function(req, res){
//     res.render('survey2');
// })

app.use(indexRoutes);
app.use("/destinations", destinationRoutes);
app.use("/destinations/:id/comments", commentRoutes),
app.use("/survey2", survey2Routes),
app.use("/forum", forumRoutes);

app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Family Server Started");
});
