const mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
    "name": {type: String, required: true, max: 100},
    "category": {type: mongoose.Types.ObjectId, required: true},
    "price": {type: Number, required: true},
    "description": {type: String, max: 1000, default: ""}
});

module.exports = mongoose.model("Item", ItemSchema);