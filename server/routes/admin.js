const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const UnauthorisedError = require('../errors/unauthorisederror');

router.use(authMiddleware.guardRoute);
router.use((req, res, next) => {
    if (req.user.role === 'ADMIN') {
        next('route');
    }
    else next(new UnauthorisedError()); 
});

const user_controller = require('../controllers/usercontroller');
const item_controller = require('../controllers/itemcontroller');

router.post('/', user_controller.create_user);
router.post('/categories/', item_controller.create_category);
router.post('/items/', item_controller.create_item);

module.exports = router;