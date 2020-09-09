const FormAnswerService = require('../services/formAnswerService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class FormAnswerController {
  static post = async (req, res) => ServiceInvoke(FormAnswerService.post(req.body), res);
  
  static put = async (req, res) => ServiceInvoke(FormAnswerService.put(req.params.id, req.body), res);
  
  static get = async (req, res) => ServiceInvoke(FormAnswerService.get(req.query.userId, req.query.formId), res);
  
  static finish = async (req, res) => ServiceInvoke(FormAnswerService.finish(req.params.id), res);
}

module.exports = FormAnswerController;
