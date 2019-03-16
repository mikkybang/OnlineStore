const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');

const authController = require('../controllers/authcontroller');

router.use('/me', authMiddleware.guardRoute);
router.get('/me', authController.getMe);
router.post('/signin', authController.signin);

module.exports = router;