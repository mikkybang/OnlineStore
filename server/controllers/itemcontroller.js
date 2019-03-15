const itemService = require("../services/itemservice");

exports.create_item = (req, res, next) => {
    itemService.create_item("test", "test", 500, "test")
    .then((item) => {
        console.log(item);
        res.json(item);
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
        console.log(items);
        res.json(items);
    })
    .catch((err) => {
        next(err);
    });
}