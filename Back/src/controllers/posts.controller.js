//Libreries
const bcrypt = require("bcrypt-nodejs");
const Auth = require("../jwt/auth");

//Token
var Token = new Auth();

//Model
const PostsModel = require("../models/posts.model");

//Message
 var jsonResponse = {
     error: 500,
     message: null,
     data: null
 }

//Functions:

function register(req, res){
    clearJson();
    var params = req.body;
    var dataToken = req.user;
    var postsModel;

    if(dataToken.rolUser == "ADMIN"){
        PostsModel.findOne({titlePost: params.titlePost,
             descriptionPost: params.descriptionPost, tagsPost: params.tagsPost},
             (err, postFound)=>{
                 if(err){
                     jsonResponse.message = "error al buscar el post";
                     
                 }else{
                     if(postFound){
                         jsonResponse.error = 400;
                         jsonResponse.message = "ya existe este post";
                         jsonResponse.data = postFound;
                     }else{
                         PostsModel.save((err,saved)=>{
                             if(err){
                                 jsonResponse.message = "error al agregar post";
                                 res.status(jsonResponse.error).send(jsonResponse);
                             }else{

                                postsModel = new PostsModel({
                                    titlePost: params.titlePost,
                                    descriptionPost: params.descriptionPost,
                                    tagsPost: params.tagsPost,
                                    adminPost: dataToken._id
                                });
        
                                postsModel.save((err, postsModel)=>{
                                    if(err){
                                        jsonResponse.message = "error al guardar el post";
                                        res.status(jsonResponse.error).send(jsonResponse);
                                    }else{
                                        if(postsModel){
                                            jsonResponse.error = 200;
                                            jsonResponse.message = "Post realizado!!";
                                            jsonResponse.data = postsModel;
                                            res.status(jsonResponse.error).send(jsonResponse);
                                        }else{
                                            jsonResponse.error = 200;
                                            jsonResponse.message = "el post no posee datos";
                                            res.status(jsonResponse.error).send(jsonResponse);
                                        }
                                    }
                                });
                             }
                         })
                     }
                 }
             })
    }
    clearJson()
}

/************************************************************************************************/
function list(req, res){
    clearJson();
    PostsModel.find({},(err,listed)=>{
        if(err){
            jsonResponse.message = "Error al listar Posts";
            res.status(jsonResponse.error).send(jsonResponse);
        }else{
            jsonResponse.error = 200;
            jsonResponse.message = "Exito al listar los post!!";c
            jsonResponse.data = listed;
        }
        res.status(jsonResponse.error).send(jsonResponse);
    })
    clearJson()
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
    list
};