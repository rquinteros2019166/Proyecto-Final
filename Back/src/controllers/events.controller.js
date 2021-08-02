//Libreries
const bcrypt = require("bcrypt-nodejs");
const UserModel = require("../models/users.model");
const Auth = require("../jwt/auth");

//Token
var Token = new Auth();

//Model
const EventsModel = require("../models/events.model");
const UsersModel = require("../models/users.model");

//Message
var jsonResponse = {
    error: 500,
    message: null,
    data: null
}

//Functions:

function dateZone(date){
    return new Date(date).toLocaleString('en-GT', {
        timeZone: 'America/Guatemala'
      });
}

function register(req, res){
    clearJson();
    var eventsModel;
    var params = req.body;
    var idUser = req.params.idUser;
    var dataToken = req.user;
    var moment = dateZone(new Date() + 12096e5);

    if(dataToken.rolUser == "CLIENT" && dataToken._id == idUser){
        if(params.nameEvent && params.descriptionEvent && params.dateEvent && params.typeEvent){
            if(dateZone(params.dateEvent) >= moment){
                EventsModel.findOne({nameEvent: params.nameEvent},
                    (err,eventFound)=>{
                        if(err){
                            jsonResponse.message = "Error al encontrar un evento";
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
                                    typeEvent: params.typeEvent,
                                    userEvent: idUser
                                });
        
                                eventsModel.save((err, saveEvent)=>{
                                    if(err){
                                        jsonResponse.message = "Error al registrar un evento";
                                    }else{
                                        if(saveEvent){
                                            jsonResponse.error = 200;
                                            jsonResponse.message = "Evento registrado!!";
                                            jsonResponse.data = saveEvent;
                                            
                                        }else{
                                            jsonResponse.error = 404;
                                            jsonResponse.message = "El evento no posee datos";
                                        }
                                    }
    
                                    res.status(jsonResponse.error).send(jsonResponse);
                                });
                            }
                        }
                });
            }else{
                jsonResponse.error = 403;
                jsonResponse.message = `La fecha minima asignada es de 2 semanas: ` + moment + ", Fecha que enviaste: " + params.dateEvent;
                res.status(jsonResponse.error).send(jsonResponse);
            }
        }else{
            jsonResponse.error = 400;
            jsonResponse.message = "Debes llenar todos los campos obligatorios";
            res.status(jsonResponse.error).send(jsonResponse);
        }
        
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
}

/*****************************************************************************************************/ 
function list(req, res){
    clearJson();
    var idUser = req.params.idUser;
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN" ||
    (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){
        EventsModel.find({userEvent: idUser}).sort({date:-1}).exec((err,eventsFound)=>{
            if(err){
                jsonResponse.message = "Error al listar eventos";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(eventsFound && eventsFound.length > 0){
                    jsonResponse.error = 200;
                    jsonResponse.message = `"Lista de eventos del usuario: " ${dataToken.nickUser}`;
                    jsonResponse.data = eventsFound;
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = `"No hay eventos del usuario: " ${dataToken.nickUser}`;
                    jsonResponse.data = null;
                    res.status(jsonResponse.error).send(jsonResponse);
                }
                
            }
        })

    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

function listAll(req, res){
    clearJson();
    var idUser = req.params.idUser;
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN"){
        EventsModel.find({userEvent: idUser}).sort({date:-1}).exec((err,eventsFound)=>{
            if(err){
                jsonResponse.message = "Error al listar eventos";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(eventsFound && eventsFound.length > 0){
                    jsonResponse.error = 200;
                    jsonResponse.message = `"Lista de eventos del usuario`;
                    jsonResponse.data = eventsFound;
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = `"No hay eventos del usuario`;
                    jsonResponse.data = null;
                    res.status(jsonResponse.error).send(jsonResponse);
                }
                
            }
        })

    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

/*****************************************************************************************************/ 
function listdate(req, res){
    clearJson();
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN"){

        EventsModel.find({dateEvent : {$gte: new Date()} }).sort({dateEvent: 1}).exec((err,eventsFound)=>{
            if(err){
                console.log(err);
                jsonResponse.message = "Error al listar eventos";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(eventsFound && eventsFound.length > 0){
                    jsonResponse.error = 200;
                    jsonResponse.message = `"Lista de eventos del usuario: " ${dataToken.nickUser}`;
                    jsonResponse.data = eventsFound;
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = `"No hay eventos del usuario: " ${dataToken.nickUser}`;
                    jsonResponse.data = null;
                    res.status(jsonResponse.error).send(jsonResponse);
                }
            }
        })

    }else{
        jsonResponse.error = 400;
        jsonResponse.message = "No tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}

/*****************************************************************************************************/ 
function search(req, res){
    clearJson();
    var idUser = req.params.idUser;
    var dataToken = req.user;
    var params = req.body;
    var dateEvent = params.dateEvent;

    if(dataToken.rolUser == "ADMIN" ||
    (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){
        EventsModel.findOne({dateEvent},(err,eventsFound)=>{
            if(err){
                jsonResponse.message = "error al buscar evento";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                jsonResponse.error = 200;
                jsonResponse.message = `"evento encontrado del usuario: " ${dataToken.nickUser}`;
                jsonResponse.data = eventsFound
                res.status(jsonResponse.error).send(jsonResponse);
            }
        })
    }else{
        jsonResponse.error = 400;
        jsonResponse.message = "no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
}

/***************************************************************************************************/
function edit(req, res){
    clearJson();
    var params = req.body;
    var idEvent = req.params.idEvent;
    var idUser = req.params.idUser;
    var dataToken = req.user;

    var schema =  {};
    dataToken.rolUser == "CLIENT"?params.nameEvent?schema.nameEvent = params.nameEvent:null:null;
    dataToken.rolUser == "CLIENT"?params.descriptionEvent?schema.descriptionEvent = params.descriptionEvent:null:null;
    dataToken.rolUser == "ADMIN"?params.statusEvent?schema.statusEvent = params.statusEvent:null:null;

    if (dataToken.rolUser == "ADMIN" || (dataToken.rolUser == "CLIENT" && dataToken._id == idUser)){

        EventsModel.findByIdAndUpdate(idEvent,schema,{new: true, useFindAndModify: false},(err, eventUpdate)=>{
            if(err){
                jsonResponse.message = "Error al editar el evento";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(eventUpdate && deleted.length > 0){
                    /*jsonResponse.error = 200;
                    jsonResponse.message = `"evento: " ${eventUpdate.nameEvent} "Editado!!!"`;
                    jsonResponse.data = eventUpdate;*/

                    compraAceptada(req, eventUpdate, (err) => {
                        if(err){
                            jsonResponse.message = "Error al actualizar compra";
                        }else{
                            if(eventUpdate){
                                jsonResponse.error = 200;
                                jsonResponse.message = "Se actualizo el pedido";
                                jsonResponse.data = eventUpdate;
                            }else{
                                jsonResponse.error = 404;
                                jsonResponse.message = err;
                            }
                        }
                        
                        res.status(jsonResponse.error).send(jsonResponse);
                    });
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message ="no se encontro el evento";
                    res.status(jsonResponse.error).send(jsonResponse);
                }
            }
        })
    }else{
        jsonResponse.error = 403;
        jsonResponse.message ="no tienes acceso";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    
}


function compraAceptada(req, eventUpdate, callback){
    if(req.body.statusEvent = "ACEPTADO" && eventUpdate.statusEvent == "ACEPTADO"){
        UsersModel.findOne({_id : eventUpdate.userEvent, "buysUser.eventBuy" : eventUpdate._id},(err, buy) => {
            if(err){
                callback(err);
            }else{
                if(!buy){
                    UsersModel.findByIdAndUpdate(eventUpdate.userEvent, {
                        $push: {
                            buysUser : {
                                eventBuy : eventUpdate._id
                            }
                        }
                    }, {new: true, useFindAndModify: false}, (err, agregado) => {
                        if(err){
                            callback(true);
                        }else{
                            callback(false);
                        }
                    });
                }else{
                    callback(false);
                }
            }
        });
    }else{
        callback(false);
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
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(deleted){
                    jsonResponse.error = 200;
                    jsonResponse.message = `"evento: " ${deleted.nameEvent} "eliminado!!!"`;
                    jsonResponse.data = deleted;
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message ="no se encontro el evento";
                    res.status(jsonResponse.error).send(jsonResponse);
                }
                
            }
            
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
    listdate,
    search,
    edit,
    erase,
    listAll
};