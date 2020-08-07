const mongoose = require('mongoose');

const user = new mongoose.Schema({
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: false, default: true },
  gender: { type: String, required: false },
  birthDate: { type: Date, required: false },
  scholarity: { type: String, required: false },
  profession: { type: String, required: false },
  phone: { type: String, required: false },
  city: { type: String, required: false },
  uf: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const userModel = mongoose.model('users', user, 'users');

class UserModel {
  static list(query) {
    return userModel.find(query).sort({ createdAt: -1 });
  }

  static getByEmail(email) {
    return userModel.findOne({ email });
  }

  static getByCPF(cpf) {
    return userModel.findOne({ cpf });
  }

  static getById(id) {
    return userModel.findById(id);
  }

  static add(body) {
    return userModel.create(body);
  }

  static put(body) {
    const query = { _id: body._id };
    return userModel.findOneAndUpdate(
      query,
      body,
      { new: true },
    );
  }

  static delete(_id) {
    const query = { _id: mongoose.Types.ObjectId(_id) };
    return userModel.deleteOne(query);
  }

  static deleteMany(query) {
    return userModel.deleteMany(query);
  }

  static count(query) {
    return userModel.countDocuments(query);
  }
}

module.exports = UserModel;
