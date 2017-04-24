var express = require('express'),
    app = express();


//CONFIG
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render('index');
});



app.listen(3000, function(req, res){
    console.log("Family Server Started");
});