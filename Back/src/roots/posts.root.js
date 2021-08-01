//Global variables
const express = require("express");
const controller = require("../controllers/posts.controller");
const Auth = require("../jwt/auth");

//Variables
var token = new Auth();
var api = express.Router();

//Routs
api.get("/user/post/:idPost", token.ensureAuthOptional, controller.getOne);
api.get("/user/posts", token.ensureAuthOptional, controller.list);
api.post("/user/posts", token.ensureAuthOptional, controller.search);
api.post("/user/post/register", token.ensureAuth, controller.register);
api.put("/user/post/:idPost", token.ensureAuth, controller.edit);
api.delete("/user/post/:idPost", token.ensureAuth, controller.erase);

//Export
module.exports = api;