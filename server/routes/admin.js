const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');

router.use(authMiddleware.guardRoute);

const user_controller = require('../controllers/usercontroller');
const item_controller = require('../controllers/itemcontroller');

router.post('/', user_controller.create_user);
router.post('/categories/');
router.post('/items/');

module.exports = router;