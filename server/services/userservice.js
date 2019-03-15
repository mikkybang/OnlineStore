const User = require('../models/user');
const ResourceNotFoundError = require('../errors/resourcenotfounderror');

const newUser = (username, email, password, role) => {
    return new User({
        username,
        email,
        password,
        role
    });
}

exports.create_user = (username, email, password) => {
    return new Promise((resolve, reject) => {
        let user = newUser(username, email, password);
        user.save(user, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
}

exports.create_admin_user = (username, email, password) => {
    return new Promise((resolve, reject) => {
        let user = newUser(username, email, password, "ADMIN");
        user.save(user, (err, user) => {
            if (err) reject(err);
            resolve(user);
        });
    });
}

exports.find_user_by_id = (userId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
        .then((user) => {
            if (user == null) throw new ResourceNotFoundError(userId);
            resolve(user);
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_users = (query) => {
    return User.find(query);
}