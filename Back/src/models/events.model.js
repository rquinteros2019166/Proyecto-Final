const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventsSchema = Schema({
    nameEvent: String,
    descriptionEvent: String,
    statusEvent: {type: String, default: "PENDIENTE"}, 
    typeEvent: String,
    dateEvent: Date,
    
    userEvent: {type: Schema.Types.ObjectId, ref: "users"}
});

/*
    Estados:
    PENDIENTE, DENEGADO, ACEPTADO
*/

module.exports = mongoose.model("events", eventsSchema);

