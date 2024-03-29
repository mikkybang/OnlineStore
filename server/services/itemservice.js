const Item = require("../models/item");
const ItemCategory = require("../models/itemcategory");

const ResourceNotFoundError = require("../errors/resourcenotfounderror");

exports.create_item = (name, category, price, description) => {
    return new Promise((resolve, reject) => {
        ItemCategory.findOne({ category: category })
        .then((result) => {
            if (result == null) {
                throw new ResourceNotFoundError(category); 
            }
            
            let item = new Item({
                name: name,
                category: result._id,
                price: price,
                description: description
            });
            item.save(item, (err, item) => {
                if (err) reject(err);
                resolve(item);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_all_items = () => {
    return new Promise((resolve, reject) => {
        Item.find({})
        .then((items) => {
            resolve(items);
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_item_by_id = (itemId) => {
    return new Promise((resolve, reject) => {
        Item.findById(itemId).then((result) => {
            if (result == null) throw new ResourceNotFoundError(itemId);
            ItemCategory.findById(result.category)
            .then((category) => {
                let { _id, name, price, description } = result;
                let item = {
                    _id, name, price, description, category
                }
                resolve(item);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

exports.find_items_by_category = (category) => {
    return new Promise((resolve, reject) => {
        ItemCategory.findOne({category: category})
        .then((category) => {
            if (category == null) resolve([]);
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

exports.create_category = (category) => {
    let itemCategory = new ItemCategory({
        category
    });
    return itemCategory.save();
}