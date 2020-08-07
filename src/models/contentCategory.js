const mongoose = require('mongoose');

const contentCategory = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const contentCategoryModel = mongoose.model('contentCategories', contentCategory, 'contentCategories');

class ContentCategoryModel {
  static list(query) {
    return contentCategoryModel.find(query).sort({ createdAt: -1 });
  }

  static getById(id) {
    return contentCategoryModel.findById(id);
  }

  static add(body) {
    return contentCategoryModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    return contentCategoryModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return contentCategoryModel.deleteOne(query);
  }

  static deleteMany(query) {
    return contentCategoryModel.deleteMany(query);
  }

  static count(query) {
    return contentCategoryModel.countDocuments(query);
  }
}

module.exports = ContentCategoryModel;
