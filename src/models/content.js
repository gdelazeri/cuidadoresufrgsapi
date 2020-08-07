const mongoose = require('mongoose');

const content = new mongoose.Schema({
  title: { type: String, required: true },
  categoryId: { type: mongoose.Types.ObjectId, required: false },
  active: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  subtitle: { type: String, required: false },
  type: { type: String, required: false },
  imageUrl: { type: String, required: false },
  body: [{
    text: { type: String, required: false },
    type: { type: String, required: false },
    url: { type: String, required: false },
  }],
  source: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const contentModel = mongoose.model('contents', content, 'contents');

class ContentModel {
  static list(query) {
    return contentModel.find(query).sort({ createdAt: -1 });
  }

  static getById(id) {
    return contentModel.findById(id);
  }

  static add(body) {
    return contentModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    return contentModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return contentModel.deleteOne(query);
  }

  static deleteMany(query) {
    return contentModel.deleteMany(query);
  }

  static count(query) {
    return contentModel.countDocuments(query);
  }

  static aggregate(pipeline) {
    return contentModel.aggregate(pipeline);
  }
}

module.exports = ContentModel;
