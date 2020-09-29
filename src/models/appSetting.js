const mongoose = require('mongoose');

const appSetting = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const appSettingModel = mongoose.model('appSettings', appSetting, 'appSettings');

class AppSettingModel {
  static list(query) {
    return appSettingModel.find(query).sort({ createdAt: -1 });
  }

  static getById(id) {
    return appSettingModel.findById(id);
  }

  static getByName(name) {
    return appSettingModel.findOne({ name });
  }
  
  static add(body) {
    return appSettingModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    return appSettingModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return appSettingModel.deleteOne(query);
  }

  static deleteMany(query) {
    return appSettingModel.deleteMany(query);
  }

  static count(query) {
    return appSettingModel.countDocuments(query);
  }

  static aggregate(pipeline) {
    return appSettingModel.aggregate(pipeline);
  }
}

module.exports = AppSettingModel;
