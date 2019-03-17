const jwt = require('jsonwebtoken');

const key = require('../config').key;
const UnauthorisedError = require('../errors/unauthorisederror');

module.exports.setAuth = (req, res, next) => {
    if (!req.headers.authorization) { 
        next('route'); 
        return;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, key, (err, payload) => {
            if (err) throw err;
            if (payload) {
                req.user = payload;
                next('route');
            } else {
                next('route');
            }
        });
    } catch (e) {
        next(e);
    }
}

module.exports.guardRoute = (req, res, next) => {
    if (req.user) {
        //if user exists then go to next middleware
        next('route');
    }
    else{
       let err = new UnauthorisedError('you must be loggedin '+
       'to access this resource');
       next(err);
    }
  }