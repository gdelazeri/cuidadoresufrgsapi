const express = require('express');
const UserController = require('../controllers/userController');
// const Auth = require('../middlewares/auth');

const router = express.Router();

// router.post('/login', UserController.login);

router.post('/', UserController.post);

module.exports = router;
