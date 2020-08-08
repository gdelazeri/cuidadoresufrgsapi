const UserService = require('../services/userService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class UserController {
  static post = async (req, res) => ServiceInvoke(UserService.post(req.body), res);

  static login = async (req, res) => ServiceInvoke(UserService.login(req.body), res);
  
  static loginRefresh = async (req, res) => ServiceInvoke(UserService.loginRefresh(req), res);

  static get = async (req, res) => ServiceInvoke(UserService.get(req.params.id), res);
}

module.exports = UserController;
