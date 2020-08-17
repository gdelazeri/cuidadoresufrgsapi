const FormService = require('../services/formService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class FormController {
  static post = async (req, res) => ServiceInvoke(FormService.post(req.body), res);
  
  static put = async (req, res) => ServiceInvoke(FormService.put(req.params.id, req.body), res);
  
  static get = async (req, res) => ServiceInvoke(FormService.get(req.params.id), res);

  static list = async (req, res) => ServiceInvoke(FormService.list(req.query.page, req.query.pageSize, req.query.search), res);
}

module.exports = FormController;
