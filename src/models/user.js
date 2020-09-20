const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: false },
  name: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  admin: { type: Boolean, default: false },
  gender: { type: String, required: false },
  birthDate: { type: Date, required: false },
  scholarity: { type: String, required: false },
  profession: { type: String, required: false },
  phone: { type: String, required: false },
  city: { type: String, required: false },
  uf: { type: String, required: false },
  consentTermAcceptedAt: { type: Date, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

const userModel = mongoose.model('users', user, 'users');

class UserModel {
  static list(query) {
    return userModel.find(query).sort({ createdAt: -1 });
  }

  static async getByEmail(email) {
    const user = await userModel.find({ email: email.toLowerCase() }).limit(1);
    if (user.length === 1) return user[0];
    return null;
  }

  static getById(id) {
    return userModel.findById(id, { password: 0 });
  }

  static add(body) {
    body.email = body.email.toLowerCase();
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
