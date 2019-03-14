class ResourceNotFoundError extends Error {
    constructor (resource) {
        super(resource+" was not found on this server");
    }
}

module.exports = ResourceNotFoundError;