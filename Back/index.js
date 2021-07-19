//Global variables
const app = require("./app"); 
const mongoose = require("mongoose");

//Server connection
mongoose.Promise = global.Promise;

//mongodb://localhost:27017/DCAudioVisuales
//mongodb+srv://TorneosDeporte:a1b2c3d4e5@cluster0.aavqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://TorneosDeporte:a1b2c3d4e5@cluster0.aavqv.mongodb.net/DCAudioVisuales?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Servidor: localhost:3000 activo")
        app.listen(3000, null);
    })
    .catch(err => {
        console.log(err);
    });