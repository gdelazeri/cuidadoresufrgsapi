const express = require('express');

const UserController = require('../controllers/userController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', UserController.post);

router.put('/', Auth.authenticate(false), UserController.put);

router.post('/login', UserController.login);

router.post('/login/refresh', Auth.authenticate(false), UserController.loginRefresh);

router.get('/', Auth.authenticate(false), UserController.get);

router.get('/:id', Auth.authenticate(true), UserController.getById);

router.delete('/', Auth.authenticate(false), UserController.delete);

router.delete('/:id', Auth.authenticate(true), UserController.deleteById);

router.patch('/consentTerm/accept/:id', Auth.authenticate(false), UserController.acceptConsentTerm);

router.get('/consentTerm/:id', Auth.authenticate(false), UserController.getConsentTerm);

router.patch('/password', Auth.authenticate(false), UserController.passwordChange);

router.get('/password/recoverToken/:email', UserController.passwordRecoverToken);

router.post('/password/recoverToken/check/:email', UserController.passwordRecoverTokenCheck);

router.patch('/password/update/:email', UserController.passwordUpdate);

router.get('/password/rules', UserController.passwordRules);

module.exports = router;
