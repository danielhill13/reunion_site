var mongoose = require("mongoose");

//SCHEMA Setup
var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    createdDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Comment", commentSchema);
