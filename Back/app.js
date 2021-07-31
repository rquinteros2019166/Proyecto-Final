//GLOBAL VARIABLES
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var formidableParse = require("express-formidable");

//Rutas
var usersRoots = require("./src/roots/users.root");
var eventsRoots = require("./src/roots/events.root");
var postsRoots = require("./src/roots/posts.root");

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(formidableParse({ keepExtensions: true }));

//ROUTES
app.use("/api", usersRoots, eventsRoots, postsRoots);

//EXPORTS
module.exports = app;