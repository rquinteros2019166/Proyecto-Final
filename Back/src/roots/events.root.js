//Global variables
const express = require("express");
const controller = require("../controllers/events.controller");
const Auth = require("../jwt/auth");

//Variables
var token = new Auth();
var api = express.Router();

//Routs
api.get("/user/events", token.ensureAuth, controller.listAll);
api.get("/user/:idUser/events", token.ensureAuth, controller.list);
api.get("/user/:idUser/eventsDate", token.ensureAuth, controller.listdate);
api.post("/user/:idUser/events", token.ensureAuth, controller.search);
api.post("/user/:idUser/event/register", token.ensureAuth, controller.register);
api.put("/user/:idUser/event/edit/:idEvent", token.ensureAuth, controller.edit);
api.delete("/user/:idUser/event/delete/:idEvent", token.ensureAuth, controller.erase);

//Export
module.exports = api;