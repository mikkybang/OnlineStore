const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    username: {type: String, max: 100, required: true},
    password: {type: String, max: 100, required: true},
    role: {type: String, required: true, default: "USER"}
});

module.exports = mongoose.model("User", UserSchema);