var mongoose = require("mongoose");

var destinationSchema = new mongoose.Schema({
    location: String,
    image: String,
    url: String,
    body: String,
    submittedBy: String,
    created: {type: Date, default: Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Destination", destinationSchema);