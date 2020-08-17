const express = require('express');

const FormController = require('../controllers/formController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', Auth.authenticate(true), FormController.post);

router.put('/:id', Auth.authenticate(true), FormController.put);

router.get('/:id', Auth.authenticate(false), FormController.get);

router.get('/', Auth.authenticate(false), FormController.list);

module.exports = router;
