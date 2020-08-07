const express = require('express');
const ContentController = require('../controllers/contentController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', Auth.authenticate(true), ContentController.post);

// router.put('/:id', Auth.authenticate(true), ContentController.put);

// router.get('/:id', Auth.authenticate(false), ContentController.get);

router.get('/', Auth.authenticate(false), ContentController.list);

module.exports = router;
