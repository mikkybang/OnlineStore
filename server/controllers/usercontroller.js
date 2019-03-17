const UserService = require("../services/userservice");

exports.create_user = (req, res, next) => {
    let {username, email, password} = req.body;
    UserService.create_user(username, email, password)
        .then((user) => {
            res.json(user);
        }).catch((err) => next(err));
}