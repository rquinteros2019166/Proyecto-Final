//Libreries
const bcrypt = require("bcrypt-nodejs");
const Auth = require("../jwt/auth");

//Token
var Token = new Auth();

//Model
const EventsModel = require("../models/events.model");


//Message
var jsonResponse = {
    error: 500,
    message: null,
    data: null
}

//Functions:

function register(req, res){
    clearJson();
    var eventsModel;
    var params = req.body;
    var idUser = req.params.idUser;
    var dataToken = req.user;
    var date_ob = new Date();

    if(dataToken.rolUser == "ADMIN" || (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){
        //if(dateEvent >= moment() )
        EventsModel.findOne({nameEvent: params.nameEvent, descriptionEvent: params.descriptionEvent},
            (err,eventFound)=>{
                if(err){
                    jsonResponse.message = "error al encontrar un evento";
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    if(eventFound){
                        jsonResponse.error = 403;
                        jsonResponse.message = "evento ya registrado";
                        jsonResponse.data = eventFound;
                        res.status(jsonResponse.error).send(jsonResponse);
                    }else{

                        eventsModel = new EventsModel({
                            nameEvent: params.nameEvent,
                            descriptionEvent: params.descriptionEvent,
                            dateEvent: params.dateEvent,
                            userEvent: idUser
                        });

                        eventsModel.save((err, saveEvent)=>{
                            if(err){
                                jsonResponse.message = "error al registrar un evento";
                                res.status(jsonResponse.error).send(jsonResponse);
                            }else{
                                if(saveEvent){
                                    jsonResponse.error = 200;
                                    jsonResponse.message = "evento registrado!!";
                                    jsonResponse.data = saveEvent;
                                    res.status(jsonResponse.error).send(jsonResponse);
                                }else{
                                    jsonResponse.error = 200;
                                    jsonResponse.message = "el evento no posee datos";
                                    res.status(jsonResponse.error).send(jsonResponse);
                                }
                            }
                        });
                    }
                }
        })
    }
    clearJson();
}

/*****************************************************************************************************/ 
function list(req, res){
    clearJson();
    var idUser = req.params.idUser;
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN" ||
    (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){
        EventsModel.find({userEvent: idUser}).exec((err,eventsFound)=>{
            if(err){
                jsonResponse.message = "error al listar eventos";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                jsonResponse.error = 200;
                jsonResponse.message = `"Lista de eventos del usuario: " ${dataToken.nickUser}`;
                jsonResponse.data = eventsFound;
                res.status(jsonResponse.error).send(jsonResponse);
            }
        })

        //populate()
    }else{
        jsonResponse.error = 400;
        jsonResponse.message = "no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

/*****************************************************************************************************/ 
function searchs(req, res){
    clearJson();
    var idUser = req.params.idUser;
    var dataToken = req.user;
    var idEvent = req.params.idEvent;

    if(dataToken.rolUser == "ADMIN" ||
    (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){
        EventsModel.findOne({userEvent: idEvent},(err,eventsFound)=>{
            if(err){
                jsonResponse.message = "error al buscar evento";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                jsonResponse.error = 200;
                jsonResponse.message = `"evento encontrado del usuario: " ${dataToken.nickName}`;
                jsonResponse.data = eventsFound
                res.status(jsonResponse.error).send(jsonResponse);
            }
        })
    }else{
        jsonResponse.error = 400;
        jsonResponse.message = "no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    clearJson();
}

/***************************************************************************************************/
function edit(req, res){
    clearJson();
    var params = req.body;
    var idEvent = req.params.idEvent;
    var idUser = req.params.idUser;
    var dataToken = req.user;

    var schema =  {};
    params.name?(schema.nameEvent = params.nameEvent):null;
    params.image?(schema.descriptionEvent = params.descriptionEvent):null;
    dataToken.rolUser == "ADMIN"?params.date?(schema.date = params.date):null:null;

    if (dataToken.rolUser == "ADMIN" ||(dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){

        EventsModel.findByIdAndUpdate(idEvent,schemaUpdate,{new: true},(err, eventEdited)=>{
            if(err){
                jsonResponse.message = "error al editar el evento";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(eventEdit){
                    
                    jsonResponse.error = 200;
                    jsonResponse.message = `"evento: " ${eventEdited.nameEvent} "Editado!!!"`;
                    jsonResponse.data = eventEdited;
                    
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message ="no se encontro el evento";
                }
            }
            res.status(jsonResponse.error).send(jsonResponse);
        })
    }else{
        jsonResponse.error = 403;
        jsonResponse.message ="no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

/*********************************************************************************************/
function erase(req, res){
    clearJson();
    var dataToken = req.user;
    var idUser = req.params.idUser;
    var idEvent = req.params.idEvent;

    if(dataToken.rolUser == "ADMIN"){
        EventsModel.findByIdAndDelete(idEvent, (err, deleted)=>{
            if(err){
                jsonResponse.message = "error al eliminar evento!!";
            }else{
                if(deleted){
                    jsonResponse.error = 200;
                    jsonResponse.message = `"evento: " ${deleted.nameEvent} "Editado!!!"`;
                    jsonResponse.data = deleted;
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message ="no se encontro el evento";
                }
            }
            res.status(jsonResponse.error).send(jsonResponse);
        })
    }else{
        jsonResponse.error = 403;
        jsonResponse.message ="no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

/* Recycler Functions */
function clearJson(){
    jsonResponse.error = 500;
    jsonResponse.message = "";
    jsonResponse.data = null;
    delete jsonResponse.token;
}


//Export
module.exports = {
    register,
    list,
    searchs,
    edit,
    erase
};