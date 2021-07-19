//Global variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model
var usersSchema = Schema({
    nickUser: String,
    fullNameUser: String,
    emailUser: String,
    phoneUser: Number,
    addressUser: String,
    passwordUser: String,
    imageUser: String,
    
    rolUser: {type: String, default: "CLIENT"}
});

//Export
module.exports = mongoose.model("users", usersSchema);