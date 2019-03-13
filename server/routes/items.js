const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemcontroller');

router.post('/', item_controller.create_item);
router.get('/id/:itemId', item_controller.get_item);
router.get('/category/:category', item_controller.get_items_by_category);

module.exports = router;