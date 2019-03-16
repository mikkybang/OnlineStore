const authservice = require('../services/authservice');

const UnauthorisedError = require('../errors/unauthorisederror');

exports.getMe = (req, res, next) => {
    res.json(req.user);
}

exports.signin = (req, res, next) => {
    let { email, password } = req.body;
    authservice.signin(email, password)
    .then((user) => {
        if (user == null) {
            throw new UnauthorisedError();
        }
        res.json(user);
    })
    .catch((err) => next(err));
}