const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    username: {type: String, max: 100, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, max: 100, required: true},
    role: {type: String, required: true, default: "USER"}
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {return next()}
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
});

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if(err) return next(err);
        next(null, isMatch);
    });
}

module.exports = mongoose.model("User", UserSchema);