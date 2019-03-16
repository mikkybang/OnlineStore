module.exports = class UnauthorisedError extends Error {
    constructor() {
        super('You are not authorised to access this resource');
    }
}