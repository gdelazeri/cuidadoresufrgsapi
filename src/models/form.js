const mongoose = require('mongoose');

const option = {
  label: { type: String, required: false },
  value: { type: String, required: false },
};

const form = new mongoose.Schema({
  active: { type: Boolean, default: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: false },
  imageUrl: { type: String, required: false },
  questions: [{
    type: { type: String, required: false },
    label: { type: String, required: false },
    options: [option],
    required: { type: Boolean, required: false, default: true },
    help: { type: String, required: false },
  }],
  options: [option],
  createdAt: { type: Date, required: true, default: Date.now },
});

const formModel = mongoose.model('forms', form, 'forms');

class FormModel {
  static list(query) {
    return formModel.find(query).sort({ createdAt: -1 });
  }

  static getById(id) {
    return formModel.findById(id);
  }

  static add(body) {
    return formModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    return formModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return formModel.deleteOne(query);
  }

  static deleteMany(query) {
    return formModel.deleteMany(query);
  }

  static count(query) {
    return formModel.countDocuments(query);
  }

  static aggregate(pipeline) {
    return formModel.aggregate(pipeline);
  }
}

module.exports = FormModel;
