var mongoose = require("mongoose");


var activitySchema = new mongoose.Schema({
    activity: String,
    image: String,
    providerUrl: String,
    description: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
            username: String
    },
    attending: [
        {
            type: String
        }
    ]
    // comments: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "ActivityComment"
    //     }
    // ]
});

module.exports = mongoose.model("Activity", activitySchema);