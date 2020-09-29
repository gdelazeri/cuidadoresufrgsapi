const AppSettingService = require('../services/appSettingService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class AppSettingController {
  static needUpdate = async (req, res) => ServiceInvoke(AppSettingService.needUpdate(req.params.appVersion), res);
}

module.exports = AppSettingController;
