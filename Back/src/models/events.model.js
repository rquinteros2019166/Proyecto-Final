//Global variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model
var eventsSchema = Schema({
    nameEvent: String,
    descriptionEvent: String,
    dateEvent: Date,


    userEvent: {type: Schema.Types.ObjectId, ref: "users"}
});

//Export
module.exports = mongoose.model("events", eventsSchema);

