const ResourceNotFoundError = require("../errors");

module.exports.resource_not_found = (err, req, res, next) => {
    console.log(err);
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