var mongoose = require("mongoose");


var survey2Schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    addlnames: String,
    attending: String, //radio button yes/no/unsure
    attendingreply: String,
    // created: {type: Date, default: Date.now},
    activities: Array,
    moreactivities: String
});

module.exports = mongoose.model("Survey2", survey2Schema);