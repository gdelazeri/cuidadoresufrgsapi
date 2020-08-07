const bcrypt = require('bcrypt');

const Auth = require('../middlewares/auth');
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
      body.admin = false;
      const user = await UserModel.add(body);

      if (user) {
        user.password = null;
        return new Response(user);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }

  static async login(body) {
    try {
      // Check required fields
      if (!body.email || !body.password) {
        return new Response(null, ErrorTypes.U003);
      }
      
      // Check if e-mail exists
      const user = await UserModel.getByEmail(body.email);
      if (!user) {
        return new Response(null, ErrorTypes.U004);
      }

      const successfull = await bcrypt.compare(body.password, user.password);
      if (successfull) {
        const token = Auth.createToken({ _id: user._id, name: user.name, email: user.email, admin: user.admin });
        return new Response({ token });
      }

      return new Response(null, ErrorTypes.U004);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
