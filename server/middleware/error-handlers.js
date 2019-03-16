const ResourceNotFoundError = require("../errors/resourcenotfounderror");
const BadRequestError = require('../errors/badrequesterror');
const UnauthorisedError = require('../errors/unauthorisederror');

module.exports.resource_not_found = (err, req, res, next) => {
    if (err instanceof ResourceNotFoundError) {
        res.status(404).json({
            statusCode: 404,
            message: "error",
            errors: [
                err.message
            ]
        });
    } else next(err);
}

module.exports.bad_request = (err, req, res, next) => {
    if (err instanceof BadRequestError) {
        res.status(400).json({
            statusCode: 400,
            message: "error",
            errors: [
                err.message
            ]
        });
    } else next(err);
}

module.exports.unauthorised = (err, req, res, next) => {
    if (err instanceof UnauthorisedError) {
        res.status(401).json({
            statusCode: 401,
            message: 'error',
            errors: [
                err.message
            ]
        });
    }else next(err);
}