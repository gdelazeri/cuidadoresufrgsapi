const log = require('../config/log');
const UserModel = require('../models/user');

class UserService {
  static async post(body) {
    try {
      const user = await UserModel.add(body);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
