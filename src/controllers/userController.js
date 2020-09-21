const UserService = require('../services/userService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class UserController {
  static post = async (req, res) => ServiceInvoke(UserService.post(req.body), res);

  static login = async (req, res) => ServiceInvoke(UserService.login(req.body), res);
  
  static loginRefresh = async (req, res) => ServiceInvoke(UserService.loginRefresh(req), res);

  static get = async (req, res) => ServiceInvoke(UserService.get(req.params.id), res);
 
  static acceptConsentTerm = async (req, res) => ServiceInvoke(UserService.acceptConsentTerm(req.params.id), res);
  
  static passwordRecoverToken = async (req, res) => ServiceInvoke(UserService.passwordRecoverToken(req.params.email), res);
  
  static passwordRecoverTokenCheck = async (req, res) => ServiceInvoke(UserService.passwordRecoverTokenCheck(req.params.email, req.body.token), res);
  
  static updatePassword = async (req, res) => ServiceInvoke(UserService.updatePassword(req.params.email, req.body.token, req.body.password), res);
}

module.exports = UserController;
