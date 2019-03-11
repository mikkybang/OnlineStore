const mongoose = require("mongoose");

let ItemCategorySchema = new mongoose.Schema(
    {
        "category": {type: String, required: true, max: 100}
    }
);

module.exports = mongoose.model("ItemCategory", ItemCategorySchema);