const mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
    "name": {type: String, required: true, max: 100},
    "category": {type: ObjectId, required: true},
    "price": {type: Number, required: true},
    "description": {type: String, required: false, max: 1000}
});

module.exports = mongoose.model("Item", ItemSchema);