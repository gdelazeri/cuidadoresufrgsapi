const mongoose = require('mongoose');

const formAnswer = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  formId: { type: mongoose.Types.ObjectId, required: true },
  questions: [{
    title: { type: String, required: false },
    value: { type: String, required: false },
  }],
  updatedAt: { type: Date, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const formAnswerModel = mongoose.model('formAnswers', formAnswer, 'formAnswers');

class FormAnswerModel {
  static get(userId, formId) {
    return formAnswerModel.findOne({
      userId: mongoose.Types.ObjectId(userId),
      formId: mongoose.Types.ObjectId(formId),
    });
  }

  static getById(id) {
    return formAnswerModel.findById(id);
  }

  static add(body) {
    return formAnswerModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    body.updatedAt = new Date();
    return formAnswerModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return formAnswerModel.deleteOne(query);
  }

  static deleteMany(query) {
    return formAnswerModel.deleteMany(query);
  }

  static count(query) {
    return formAnswerModel.countDocuments(query);
  }
}

module.exports = FormAnswerModel;
