var mongoose = require("mongoose");

//SCHEMA Setup
var forumCommentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    createdDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model("ForumComment", forumCommentSchema);
