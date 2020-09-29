const AppSettingModel = require('../models/appSetting');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');

class AppSettingService {
  static async needUpdate(appVersion) {
    try {
      // Check required fields
      if (!appVersion) {
        return new Response(null, ErrorTypes.S001);
      }

      const appVersionSplit = appVersion.split('.');
      if (appVersionSplit.length === 3) {
        // Get the appSetting
        const appSetting = await AppSettingModel.getByName('minVersion');
        if (appSetting && appSetting.value) {
          const minVersionSplit = appSetting.value.split('.');
          for (let i = 0; i < minVersionSplit.length; i += 1) {
            if (parseInt(appVersionSplit[i], 10) < parseInt(minVersionSplit[i], 10)) {
              return new Response(true);
            }
          }
          return new Response(false);
        } else {
          return new Response(null, ErrorTypes.S002);
        }
      } else {
        return new Response(null, ErrorTypes.S001);
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AppSettingService;
