const itemService = require("../services/itemservice");

exports.create_item = (req, res, next) => {
    let { name, category, price, description } = req.body;
    itemService.create_item(name, category, price, description)
        .then((item) => {
            res.json(item);
        }).catch((err) => {
            next(err);
        });
}

exports.get_all_items = (req, res, next) => {
    itemService.find_all_items()
        .then((items) => {
            res.json(items);
        }).catch((err) => {
            next(err);
        });
}

exports.get_item = (req, res, next) => {
    itemService.find_item_by_id(req.params.itemId)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(err);
        });
}

exports.get_items_by_category = (req, res, next) => {
    itemService.find_items_by_category(req.params.category)
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(err);
        });
}

exports.create_category = (req, res, next) => {
    let { category } = req.body;
    itemService.create_category(category)
        .then((saved) => {
            res.json(saved._doc);
        }).catch((err) => next(err));
}