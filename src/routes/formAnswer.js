const express = require('express');

const FormAnswerController = require('../controllers/formAnswerController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', Auth.authenticate(false), FormAnswerController.post);

router.put('/:id', Auth.authenticate(false), FormAnswerController.put);

router.get('/', Auth.authenticate(false), FormAnswerController.get);

router.put('/finish/:id', Auth.authenticate(false), FormAnswerController.finish);

module.exports = router;
