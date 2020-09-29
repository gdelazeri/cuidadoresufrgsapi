const express = require('express');

const AppSettingController = require('../controllers/appSettingController');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.get('/needUpdate/:appVersion', Auth.authenticate(false), AppSettingController.needUpdate);

module.exports = router;
