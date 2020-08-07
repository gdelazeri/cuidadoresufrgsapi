const UserModel = require('../models/user');
const ErrorTypes = require('../types/ErrorTypes');

class UserService {
  static async post(body) {
    try {
      // Check required fields
      if (!body.name || !body.email || !body.password) {
        return {
          success: false,
          errors: [ErrorTypes.U003],
        }
      }
      
      // Check if e-mail already exists
      const emailExistent = await UserModel.getByEmail(body.email);
      if (emailExistent) {
        return {
          success: false,
          errors: [ErrorTypes.U001],
        }
      }

      // Add new user
      const user = await UserModel.add(body);

      if (user) {
        return {
          success: true,
          result: user,
        }
      }

      return {
        success: false,
        errors: [ErrorTypes.U000],
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
