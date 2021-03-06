//Libreries
const bcrypt = require("bcrypt-nodejs");
const Auth = require("../jwt/auth");
const imgbbUploader = require("imgbb-uploader");
const fetch = require('node-fetch');

//Model
const PostsModel = require("../models/posts.model");

//Message
var jsonResponse = {
    error: 500,
    message: null,
    data: null
}

//Functions:

/************************************************************************************************/
function search(req, res){
    var params = req.body;

    PostsModel.aggregate([{ $match : {"titlePost" : { $regex: params.titlePost, $options: 'i' } }}, { $sort: { "createdTime" : -1 }} ]).exec((err, finded) => {
        if(err){
            jsonResponse.message = "Error al buscar publicaciones";
            res.status(jsonResponse.error).send(jsonResponse);
        }else{
            if(finded && finded.length > 0){
                jsonResponse.error = 200;
                jsonResponse.message = "Resultados de la busqueda";
                jsonResponse.data = finded;
            }else{
                jsonResponse.error = 404;
                jsonResponse.message = "El post no posee datos";
            }

            res.status(jsonResponse.error).send(jsonResponse);
        }
    });

    clearJson();
}

/************************************************************************************************/
function list(req, res){
    PostsModel.find({},(err,listed)=>{
        if(err){
            jsonResponse.message = "Error al listar Posts";
        }else{
            jsonResponse.error = 200;
            jsonResponse.message = "Exito al listar los post!!";
            jsonResponse.data = listed;
        }
        res.status(jsonResponse.error).send(jsonResponse);
    });
    clearJson();
}

function getOne(req, res){
    PostsModel.findById(req.params.idPost,(err,listed)=>{
        if(err){
            jsonResponse.message = "Error al listar Posts";
        }else{
            jsonResponse.error = 200;
            jsonResponse.message = "Exito al listar los post!!";
            jsonResponse.data = listed;
        }
        res.status(jsonResponse.error).send(jsonResponse);
    });
    clearJson();
}

/************************************************************************************************/
function register(req, res){
    var params = req.body;
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN"){
        PostsModel.findOne({titlePost: params.titlePost,
             descriptionPost: params.descriptionPost, tagsPost: params.tagsPost},
             (err, postFound)=>{
                 if(err){
                     jsonResponse.message = "Error al buscar el post";
                     res.status(jsonResponse.error).send(jsonResponse);
                 }else{
                     if(postFound){
                         jsonResponse.error = 400;
                         jsonResponse.message = "Ya existe este post";
                         jsonResponse.data = postFound;

                         res.status(jsonResponse.error).send(jsonResponse);
                     }else{
                        var form = new URLSearchParams();
                        form.append('key', '05803344c54893283c1afe967b20d2d3');
                        form.append('image', params.imagePost);

                        fetch("https://api.imgbb.com/1/upload", {
                            method: 'post',
                            body: form
                        })
                            .then(res => res.json())
                            .then(body => {
                                postsModel = new PostsModel({
                                    titlePost: params.titlePost,
                                    descriptionPost: params.descriptionPost,
                                    imagePost: body.data.url,
                                    tagsPost: params.tagsPost,
                                    datePost: params.datePost,
                                    adminPost: dataToken._id
                                });
        
                                postsModel.save((err, postsModel)=>{
                                    if(err){
                                        jsonResponse.message = "Error al guardar el post";
                                    }else{
                                        if(postsModel){
                                            jsonResponse.error = 200;
                                            jsonResponse.message = "Post realizado!!";
                                            jsonResponse.data = postsModel;
                                        }else{
                                            jsonResponse.error = 200;
                                            jsonResponse.message = "El post no posee datos";
                                        }
                                    }
        
                                    res.status(jsonResponse.error).send(jsonResponse);
                                });
                            }).catch(err => {
                                jsonResponse.error = 400;
                                jsonResponse.message = "No has enviado una imagen";
                                res.status(jsonResponse.error).send(jsonResponse);
                            });
                        
                    }
                }
            });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes permisos para agregar un post";
        res.status(jsonResponse.error).send(jsonResponse);
    }
    clearJson();
}

/************************************************************************************************/
function edit(req, res){
    var idPost = req.params.idPost;
    var params = req.body;
    var dataToken = req.user;
    var schema = {};

    params.titlePost?schema.titlePost=params.titlePost:null;
    params.descriptionPost?schema.descriptionPost=params.descriptionPost:null;
    params.datePost?schema.datePost=params.datePost:null;
    params.tagsPost?schema.tagsPost=params.tagsPost:null;

    if(dataToken.rolUser == "ADMIN"){
        var form = new URLSearchParams();
        form.append('key', '05803344c54893283c1afe967b20d2d3');
        form.append('image', params.imagePost);
        fetch("https://api.imgbb.com/1/upload", {
            method: 'post',
            body: form
        })
            .then(res => res.json())
            .then(body => {

                params.imagePost?schema.imagePost=body.data.url:null;

                PostsModel.findByIdAndUpdate(idPost, schema, {new: true, useFindAndModify: false}, (err, edited) => {
                if(err){
                    jsonResponse.message = "Error al editar el post";
                    res.status(jsonResponse.error).send(jsonResponse);
                }else{
                    if(edited){
                        jsonResponse.error = 200;
                        jsonResponse.message = "Post editado";
                        jsonResponse.data = edited;
                    }else{
                        jsonResponse.error = 404;
                        jsonResponse.message = "El post no existe";
                    }

                    res.status(jsonResponse.error).send(jsonResponse);
                }
            });
        }).catch(err => {
                                jsonResponse.error = 400;
                                jsonResponse.message = "No has enviado una imagen";
                                res.status(jsonResponse.error).send(jsonResponse);
                            });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes permisos para agregar un post";
        res.status(jsonResponse.error).send(jsonResponse);
    }

    clearJson();
}

/************************************************************************************************/
function erase(req, res){
    var idPost = req.params.idPost;
    var dataToken = req.user;

    if(dataToken.rolUser == "ADMIN"){
        PostsModel.findByIdAndDelete(idPost, (err, deleted) => {
            if(err){
                jsonResponse.message = "Error al eliminar el post";
                res.status(jsonResponse.error).send(jsonResponse);
            }else{
                if(deleted){
                    jsonResponse.error = 200;
                    jsonResponse.message = "Post eliminado";
                    jsonResponse.data = deleted;
                }else{
                    jsonResponse.error = 404;
                    jsonResponse.message = "El post no posee datos";
                }

                res.status(jsonResponse.error).send(jsonResponse);
            }
        });
    }else{
        jsonResponse.error = 403;
        jsonResponse.message = "No tienes acceso para eliminar este post";
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
    list,
    register,
    edit,
    erase,
    search,
    getOne
};

/*************************************************************************************************/
