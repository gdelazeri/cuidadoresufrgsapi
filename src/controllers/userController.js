const log = require('../config/log');
const UserService = require('../services/userService');

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
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
