//Global variables
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model
var postsSchema = Schema({
    titlePost: String,
    descriptionPost: String,
    tagsPost: String,

    adminPost: { type: Schema.Types.ObjectId, ref: "users"}
});

//Export
module.exports = mongoose.model("posts", postsSchema);