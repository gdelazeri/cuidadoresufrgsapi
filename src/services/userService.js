const bcrypt = require('bcrypt');

const UserModel = require('../models/user');
const ErrorTypes = require('../types/ErrorTypes');
const Response = require('../types/Response');

class UserService {
  static async post(body) {
    try {
      // Check required fields
      if (!body.name || !body.email || !body.password) {
        return new Response(null, ErrorTypes.U003);
      }
      
      // Check if e-mail already exists
      const emailExistent = await UserModel.getByEmail(body.email);
      if (emailExistent) {
        return new Response(null, ErrorTypes.U001);
      }

      // Add new user
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hashSync(body.password, salt);
      const user = await UserModel.add(body);

      if (user) {
        delete user.password;
        return new Response(user);
      }
      return new Response(null, ErrorTypes.U000);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
