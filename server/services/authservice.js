const jwt = require('jsonwebtoken');

const key = require('../key');
const userservice = require('../services/userservice');

exports.signin = (email, password) => {
    return new Promise((resolve, reject) => {
        userservice.find_users({ email })
        .then((users) => {
            if (users == null) resolve(null);
            if (users.length == 0) resolve(null);
            let user = users[0];
            user.comparePassword(password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    let token = jwt.sign(user._doc, key);
                    resolve(Object.assign(user._doc, { token }));
                }else resolve(null);
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}