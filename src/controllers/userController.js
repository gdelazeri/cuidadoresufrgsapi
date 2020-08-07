const log = require('../config/log');
const UserService = require('../services/userService');

class UserController {
  static async post(req, res) {
    try {
      const user = await UserService.post(req.body);
      res.send({ user });
    } catch (e) {
      log.error(e);
      res.sendStatus(500);
    }
  }
}

module.exports = UserController;
