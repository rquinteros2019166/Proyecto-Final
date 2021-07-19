//Global variables
const express = require("express");
const controller = require("../controllers/events.controller");
const Auth = require("../jwt/auth");

//Variables
var token = new Auth();
var api = express.Router();

//Routs
api.get("/user/:idUser/events", token.ensureAuth, controller.list);
api.get("/user/:idUser/event/:idEvent", token.ensureAuth, controller.searchs);
api.post("/user/:idUser/event/register", token.ensureAuth, controller.register);
api.put("/user/:idUser/event/edit/:idUser", token.ensureAuth, controller.edit);
api.delete("/user/:idUser/event/delete/:idUser", token.ensureAuth, controller.erase);

//Export
module.exports = api;