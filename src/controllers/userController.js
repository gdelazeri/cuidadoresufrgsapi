const UserService = require('../services/userService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class UserController {
  static post = async (req, res) => ServiceInvoke(UserService.post(req.body), res);

  static put = async (req, res) => ServiceInvoke(UserService.put(req), res);

  static login = async (req, res) => ServiceInvoke(UserService.login(req.body), res);
  
  static loginRefresh = async (req, res) => ServiceInvoke(UserService.loginRefresh(req), res);

  static get = async (req, res) => ServiceInvoke(UserService.get(req), res);
  
  static getById = async (req, res) => ServiceInvoke(UserService.getById(req.params.id), res);

  static delete = async (req, res) => ServiceInvoke(UserService.delete(req), res);
  
  static deleteById = async (req, res) => ServiceInvoke(UserService.deleteById(req.params.id), res);
 
  static acceptConsentTerm = async (req, res) => ServiceInvoke(UserService.acceptConsentTerm(req.params.id), res);

  static getConsentTerm = async (req, res) => ServiceInvoke(UserService.getConsentTerm(req.params.id), res);

  static passwordChange = async (req, res) => ServiceInvoke(UserService.passwordChange(req), res);
  
  static passwordRecoverToken = async (req, res) => ServiceInvoke(UserService.passwordRecoverToken(req.params.email), res);
  
  static passwordRecoverTokenCheck = async (req, res) => ServiceInvoke(UserService.passwordRecoverTokenCheck(req.params.email, req.body.token), res);
  
  static passwordUpdate = async (req, res) => ServiceInvoke(UserService.passwordUpdate(req.params.email, req.body.token, req.body.password), res);

  static passwordRules = async (req, res) => ServiceInvoke(UserService.passwordRules(), res);
}

module.exports = UserController;
