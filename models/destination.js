var mongoose = require("mongoose");


var destinationSchema = new mongoose.Schema({
    location: String,
    image: String,
    url: String,
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
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Destination", destinationSchema);