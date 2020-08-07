const log = require('../config/log');
const UserService = require('../services/userService');
const ErrorTypes = require('../types/ErrorTypes');
const Response = require('../types/Response');

class UserController {
  static async post(req, res) {
    try {
      const response = await UserService.post(req.body);
      if (response.success) {
        return res.status(200).send(response);
      }
      return res.status(400).send(response);
    } catch (e) {
      log.error(e);
      res.status(500).send(new Response(null, ErrorTypes.G000));
    }
  }

  static async login(req, res) {
    try {
      const response = await UserService.login(req.body);
      if (response.success) {
        return res.status(200).send(response);
      }
      return res.status(400).send(response);
    } catch (e) {
      log.error(e);
      res.status(500).send(new Response(null, ErrorTypes.G000));
    }
  }
}

module.exports = UserController;
