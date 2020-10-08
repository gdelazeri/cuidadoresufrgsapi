const express = require('express');

const AppSettingController = require('../controllers/appSettingController');

const router = express.Router();

router.get('/needUpdate/:appVersion', AppSettingController.needUpdate);

module.exports = router;
