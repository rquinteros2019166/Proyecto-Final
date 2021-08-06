//Libraries
const bcrypt = require("bcrypt-nodejs");
const Auth = require("../jwt/auth");
const fetch = require("node-fetch");

//Token
var token = new Auth();

//Models
const UsersModel = require("../models/users.model");

//json
var jsonResponse = {
    error : 500,
    message: null,
    data: null,
    token: null
};

//Functions: 
function register(req, res){
    var params = req.body;

    //It checks if there is a token, and if there is, it checks that it is ADMIN to be able to integrate a role.

    if(
        params.nickUser &&
        params.emailUser &&
        params.passwordUser 
    ){
        UsersModel.findOne(
            {$or : [
                {nickUser: params.nickUser}, 
                {emailUser: params.emailUser}
            ]}
        ).exec((err, userFound)=>{
            if(err){
                jsonResponse.message = "Error al buscar usuarios con esos datos";

                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(userFound){
                    jsonResponse.error = 403;
                    jsonResponse.message = "El usuario ya existe";
                    
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    if(params.imageUser){
                        var form = new URLSearchParams();
                        form.append('key', '05803344c54893283c1afe967b20d2d3');
                        form.append('image', params.imageUser);

                        fetch("https://api.imgbb.com/1/upload", {
                            method: 'post',
                            body: form
                        })
                            .then(res => res.json())
                            .then(body => {
                                modeloRegistro = new UsersModel({
                                    nickUser: params.nickUser,
                                    fullNameUser: params.fullNameUser,
                                    emailUser: params.emailUser,
                                    phoneUser: params.phoneUser,
                                    addressUser: params.addressUser,
                                    passwordUser: bcrypt.hashSync(params.passwordUser),
                                    imageUser: body.data.url
                                });
                                
                                modeloRegistro.save((err, userSaved) =>{
                                    if(err){
                                        jsonResponse.message = "Error al guardar el usuario";
                                        res.status(jsonResponse.error).send(jsonResponse);
                                    }else{
                                        login(req, res);
                                    }
                                })
                            }).catch(err => {
                                jsonResponse.error = 400;
                                jsonResponse.message = "No has enviado una imagen";
                                res.status(jsonResponse.error).send(jsonResponse);
                            });
                    }else{
                        modeloRegistro = new UsersModel({
                            nickUser: params.nickUser,
                            fullNameUser: params.fullNameUser,
                            emailUser: params.emailUser,
                            phoneUser: params.phoneUser,
                            addressUser: params.addressUser,
                            passwordUser: bcrypt.hashSync(params.passwordUser),
                            imageUser: "https://iili.io/Ai5zfn.png"
                        });
                        
                        modeloRegistro.save((err, userSaved) =>{
                            if(err){
                                jsonResponse.message = "Error al guardar el usuario";
                                res.status(jsonResponse.error).send(jsonResponse);
                            }else{
                                login(req, res);
                            }
                        })
                    }
                }
                
            }
        });
    }else{
        jsonResponse.error = 400;
        jsonResponse.message = "llenar todos los parametros obligatorios";

        res.status(jsonResponse.error).send(jsonResponse);
    }

    clearJson();
}

/**************************************************************************************/
function list(req, res){
    var dataToken = req.user;
    var jsonResponse = {
        error : 500,
        message: null,
        data: null
    };
    if(dataToken.rolUser == "ADMIN"){
        UsersModel.find({rolUser: "CLIENT"}).exec((err, usersFound)=>{
            if(err){
                jsonResponse.message = "Error al listar los usuarios";
            }else{
                if(usersFound && usersFound.length > 0){
                    jsonResponse.error = 200;
                    jsonResponse.message = "Usuarios obtenidos exitosamente!!";
                    jsonResponse.data = usersFound;
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "No se encontraron usuarios";
                }
            }

            res.status(jsonResponse.error).send(jsonResponse);
        });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes acceso";

        res.status(jsonResponse.error).send(jsonResponse);
    }

    clearJson();
}
    

/**************************************************************************************/
function login(req, res){
    var params = req.body;

    UsersModel.findOne({
            $or : [
                {emailUser: params.emailUser}
            ]
        }, 
        (err, userFound) => {
            if(err){
                jsonResponse.message = "Error al buscar usuarios con esos datos";
                
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(userFound){
                    if(bcrypt.compareSync(params.passwordUser, userFound.passwordUser)){
                        jsonResponse.error = 200;
                        jsonResponse.message = "Has iniciado sesion!!";
                        jsonResponse.data = userFound;
                        jsonResponse.token = token.createToken(userFound);
                    }else{
                        jsonResponse.error = 403;
                        jsonResponse.message = "Contraseña incorrecta";
                    }
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "No existe el usuario";
                    jsonResponse.data = null;
                    jsonResponse.token = null;
                }

                res.status(jsonResponse.error).send(jsonResponse);
            }
        }
    );

    clearJson();
}

/**************************************************************************************/
function edit(req, res){
    var idUser = req.params.idUser;
    var params = req.body;
    var dataToken = req.user;

    var schema = {};

    params.nickUser?schema.nickUser = params.nickUser:null;
    params.fullNameUser?schema.fullNameUser = params.fullNameUser:null;
    params.emailUser?schema.emailUser = params.emailUser:null;
    params.addressUser?schema.addressUser = params.addressUser:null;
    params.phoneUser?schema.phoneUser = params.phoneUser:null;
    params.passwordUser && params.passwordUser.length > 4?schema.passwordUser = bcrypt.hashSync(params.passwordUser):null;

    dataToken.rolUser == "ADMIN"?params.rolUser?schema.rolUser = params.rolUser:null:null;

    if(dataToken._id = idUser || dataToken.rolUser == "ADMIN"){
        if(params.imageUser){
            var form = new URLSearchParams();
            form.append('key', '05803344c54893283c1afe967b20d2d3');
            form.append('image', params.imageUser);

            fetch("https://api.imgbb.com/1/upload", {
                method: 'post',
                body: form
            })
                .then(res => res.json())
                .then(body => {
                    schema.imageUser = body.data.url;

                    UsersModel.findByIdAndUpdate(idUser, schema, {new: true, useFindAndModify: false}, (err, userUpdated) => {
                        if(err){
                            jsonResponse.message = "Error al editar usuario";
                            
                            res.status(jsonResponse.error).send(jsonResponse);
                        }else{
                            if(userUpdated){
                                jsonResponse.error = 200;
                                jsonResponse.message = "Editado exitosamente";
                                jsonResponse.data = userUpdated;
            
                                res.status(jsonResponse.error).send(jsonResponse);
                            }else{
                                jsonResponse.error = 404;
                                jsonResponse.message = "Error en encontrado";
                            
                                res.status(jsonResponse.error).send(jsonResponse);
                            }
                        }
                    });
                }).catch(err => {
                    jsonResponse.error = 400;
                    jsonResponse.message = "No has enviado una imagen valida";
                    res.status(jsonResponse.error).send(jsonResponse);
                });
        }else{
            UsersModel.findByIdAndUpdate(idUser, schema, {new: true, useFindAndModify: false}, (err, userUpdated) => {
                if(err){
                    jsonResponse.message = "Error al editar usuario";
                    
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    if(userUpdated){
                        jsonResponse.error = 200;
                        jsonResponse.message = "Editado exitosamente";
                        jsonResponse.data = userUpdated;
    
                        res.status(jsonResponse.error).send(jsonResponse);
                    }else{
                        jsonResponse.error = 404;
                        jsonResponse.message = "Error en encontrado";
                    
                        res.status(jsonResponse.error).send(jsonResponse);
                    }
                }
            });
        }
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes permisos para editar";

        res.status(jsonResponse.error).send(jsonResponse);
    }

    clearJson();
}

/****************************************************************************************/
function erase(req, res){
    var idUser = req.params.idUser;
    var dataToken = req.user;

    if(dataToken._id == idUser || dataToken.rolUser == "ADMIN"){
        UsersModel.findByIdAndDelete(idUser, (err, userDelete)=>{
            if(err){
                jsonResponse.message = "Error al eliminar usuario";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(userDelete){
                    jsonResponse.error = 200;
                    jsonResponse.message = "Usuario eliminado exitosamente";
                    jsonResponse.data = userDelete;

                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "No existe el usuario que se desea eliminar";

                    res.status(jsonResponse.error).send(jsonResponse);
                }
            }
        });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes acceso a esta función";
        
        res.status(jsonResponse.error).send(jsonResponse);
    }

    clearJson();
}

/* Recycler Functions */
function clearJson(){
    jsonResponse.error = 500;
    jsonResponse.message = "";
    jsonResponse.data = null;
    delete jsonResponse.token;
}

module.exports = {
    register,
    login,
    edit,
    erase,
    list,
    erase
};

//Remplaced Functions
/**************************************************************************************/
/*
    function add(req, res){
        var params = req.body;
        var dataToken = req.user;

        //Instance of all vars in use
        var hash;
        var modeloRegistro;

        if(
            params.nickUser && 
            params.fullNameUser  &&
            params.emailUser && 
            params.passwordUser && 
            params.addressUser &&
            params.phoneUser
        ){
            if(dataToken.rol == "ADMIN" &&
            (UsersModel.rol == "ADMIN" || UsersModel.rol == "CLIENT")){
                UsersModel.findOne(
                    {$or : [
                        {nickUser: params.nickUser}, 
                        {emailUser: params.emailUser}
                    ]}
                ).exec((err, userFound)=>{
                    if(err){
                        jsonResponse.message = "Error al buscar usuarios con esos datos";
        
                        res.status(jsonResponse.error).send(jsonResponse);
                    }else{
                        if(userFound){
                            jsonResponse.error = 403;
                            jsonResponse.message = "El usuario ya existe";
                            
                            res.status(jsonResponse.error).send(jsonResponse);
                        }else{
                            hash = bcrypt.hashSync(params.passwordUser);
                            modeloRegistro = new UsersModel({
                                nickUser: params.nickUser,
                                fullNameUser: params.fullNameUser,
                                emailUser: params.emailUser,
                                addressUser: params.addressUser,
                                phoneUser: params.phoneUser,
                                imageUser: params.imageUser,
                                rolUser: params.rolUser,
                                passwordUser: hash,
                            });
                            
                            modeloRegistro.save((err, userSaved) =>{
                                if(err){
                                    jsonResponse.message = "Error al guardar el usuario";
                                    res.status(jsonResponse.error).send(jsonResponse);
                                }else{
                                    //jsonResponse.error = 200;
                                    //jsonResponse.message = "Usuario registrado exitosamente!!";
                                    login(req, res);
                                }
                            })
                        }
                        
                    }
                });
            }
            
        }else{
            jsonResponse.error = 400;
            jsonResponse.message = "llenar todos los parametros obligatorios";

            res.status(jsonResponse.error).send(jsonResponse);
        }
    }
*/