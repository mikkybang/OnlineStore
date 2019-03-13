const Item = require("../models/item");
const ItemCategory = require("../models/itemcategory");

const ResourceNotFoundError = require("../errors");

exports.create_item = (name, category, price, decription = "") => {
    return new Promise((resolve, reject) => {
        ItemCategory.findOne({ category: category })
        .then((result) => {
            if (result == null) {
                throw new ResourceNotFoundError(category); 
            }
            var item = new Item({
                name: name,
                category: result._id,
                price: price,
                decription: description
            });
            console.log(item);
            item.save(item, (err, item) => {
                if (err) reject(err);
                console.log(item);
                resolve(item);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_item_by_id = (itemId) => {
    return new Promise((resolve, reject) => {
        Item.findById(itemId).then((result) => {
            if (result == null) throw new ResourceNotFoundError(itemId);
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_items_by_category = (category) => {
    return new Promise((resolve, reject) => {
        ItemCategory.findOne({category: category})
        .then((category) => {
            if (category == null) return [];
            Item.find({category: category._id})
            .then((items) => {
                resolve(items);
            })
            .catch((err) => {
                throw err;
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}