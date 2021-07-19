//Global variables
const express = require("express");
const controller = require("../controllers/users.controller");
const Auth = require("../jwt/auth");

//Variables
var token = new Auth();
var api = express.Router();

//Routs
api.get("/users", token.ensureAuth, controller.list);
api.post("/user/login", controller.login);
api.post("/user/register", token.ensureAuthOptional, controller.register);
api.put("/user/edit/:idUser", token.ensureAuth, controller.edit);
api.delete("/user/delete/:idUser", token.ensureAuth, controller.erase);

//Export
module.exports = api;