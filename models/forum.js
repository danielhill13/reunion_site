var mongoose = require("mongoose");


var forumSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
            username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "forumComment"
        }
    ]
});

module.exports = mongoose.model("Forum", forumSchema);