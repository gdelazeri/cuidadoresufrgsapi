const log = require('../config/log');
const UserService = require('../services/userService');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class UserController {
  static post = async (req, res) => ServiceInvoke(UserService.post(req.body), res);

  static login = async (req, res) => ServiceInvoke(UserService.login(req.body), res);

  static get = async (req, res) => ServiceInvoke(UserService.get(req.params.id), res);
}

module.exports = UserController;
