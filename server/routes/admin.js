const express = require('express');
const router = express.Router();

// TODO add add authentication middleware 
// router.use();

const user_controller = require('../controllers/usercontroller');
const item_controller = require('../controllers/itemcontroller');

router.post('/', user_controller.create_user);
router.get('/me');
router.post('/categories/');
router.post('/items/');

module.exports = router;