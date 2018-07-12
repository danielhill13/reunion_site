var express             = require('express'),
    app                 = express(),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    cookieParser        = require('cookie-parser'),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require('express-sanitizer'),
    nodemailer          = require('nodemailer'),
    Mailgun             = require('mailgun-js'),
    async               = require('async'),
    bcrypt              = require('bcrypt-nodejs'),
    crypto              = require('crypto'),
    dotenv              = require('dotenv'),
    Destination         = require("./models/destination"),
    Activity            = require("./models/activity"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    Survey2             = require("./models/survey2"),
    forumComment        = require("./models/forumcomment"),
    forumRoutes         = require("./models/forum");
//Routes Requires
var commentRoutes       = require("./routes/comments"),
    destinationRoutes   = require("./routes/destinations"),
    indexRoutes         = require("./routes/index"),
    survey2Routes       = require("./routes/survey2"),
    forumRoutes         = require("./routes/forum");
    forumCommentRoutes  = require("./routes/forumcomment");
    activityRoutes      = require("./routes/activity");

// Load environment variables from .env file
dotenv.load();

//CONFIG
var dbUrl = process.env.DATABASEURL || "mongodb://localhost/reunion_site";
mongoose.connect(dbUrl);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());
app.use(cookieParser());
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: process.env.SESSION_SECRET || "this is a secret thing for my passport family reunion site",
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
app.get("/destination", function(req, res){
    res.render('destination');
});
app.get("/firstyear", function(req, res){
    res.render("firstyear");
});

app.use(indexRoutes);
// app.use("/destinations", destinationRoutes);
// app.use("/destinations/:id/comments", commentRoutes);
app.use("/survey2", survey2Routes);
app.use("/forum", forumRoutes);
app.use("/forum/:id/forumcomment", forumCommentRoutes);
app.use("/activity", activityRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(req, res){
    console.log("Family Server Started");
});
