class Auth {
  createToken(user) {
    var jwt = require("jwt-simple");
    var moment = require("moment");
    var secret = "secret_password";

    var payload = {
        _id: user._id,
        nickUser: user.nickUser,
        fullNameUser: user.fullNameUser,
        emailUser: user.emailUser,
        phoneUser: user.phoneUser,
        addressUser: user.addressUser,
        passwordUser: user.passwordUser,
        imageUser: user.imageUser,
        rolUser: user.rolUser,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix(),
    };

    return jwt.encode(payload, secret);
  }

  ensureAuth(req, res, next) {
    var jwt = require("jwt-simple");
    var moment = require("moment");
    var secret = "secret_password";
    var token = null;
    var payload = null;

    if (!req.headers.authorization) {
        return res.status(404).send({message: "La peticion no tiene la cabecera en la Autenticacion",});
    }else{
        try {
            token = req.headers.authorization.replace(/['"]+/g, "");
            payload = jwt.decode(token, secret);

            if (payload.exp <= moment().unix()) {
                return res.status(404).send({message: "El token ha experido",});
            }else{
                req.user = payload;
                next();
            }
        } catch (error) {
            return res.status(404).send({ message: "El token no es valido" });
        }
    }
  }

  ensureAuthOptional(req, res, next) {
    var jwt = require("jwt-simple");
    var moment = require("moment");
    var secret = "secret_password";
    var token = null;
    var payload = null;

    try {
        token = req.headers.authorization.replace(/['"]+/g, "");
        payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({message: "El token ha experido",});
        }
    } catch (error) {
    }

    req.user = payload;
    next();
  }
}

module.exports = Auth;
