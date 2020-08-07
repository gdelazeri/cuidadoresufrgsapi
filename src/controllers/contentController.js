const ContentService = require('../services/contentService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class ContentController {
  static post = async (req, res) => ServiceInvoke(ContentService.post(req.body), res);
  
  static put = async (req, res) => ServiceInvoke(ContentService.put(req.params.id, req.body), res);
  
  static get = async (req, res) => ServiceInvoke(ContentService.get(req.params.id), res);

  static list = async (req, res) => ServiceInvoke(ContentService.list(req.query.page, req.query.pageSize, req.query.search, req.query.featured), res);
}

module.exports = ContentController;
