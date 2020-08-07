const express = require('express');

const UserController = require('../controllers/userController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', UserController.post);

router.post('/login', UserController.login);

router.get('/:id', Auth.authenticate(false), UserController.get);

module.exports = router;
