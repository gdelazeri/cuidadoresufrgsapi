const express = require('express');

const UserController = require('../controllers/userController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', UserController.post);

router.post('/login', UserController.login);

router.post('/login/refresh', Auth.authenticate(false), UserController.loginRefresh);

router.get('/:id', Auth.authenticate(false), UserController.get);

router.patch('acceptConsentTerm/:id', Auth.authenticate(false), UserController.acceptConsentTerm);

module.exports = router;
