//GLOBAL VARIABLES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//Rutas
var usersRoots = require("./src/roots/users.root");
var eventsRoots = require("./src/roots/events.root");
var postsRoots = require("./src/roots/posts.root");

//MIDDLEWARES
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));
app.use(bodyParser.json({limit: '500mb'}));
app.use(cors());

//ROUTES
app.use("/api", usersRoots, eventsRoots, postsRoots);

//EXPORTS
module.exports = app;