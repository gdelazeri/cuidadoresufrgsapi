const ContentService = require('../services/contentService');
const ServiceInvoke = require('../helpers/ServiceInvoke');

class ContentController {
  static post = async (req, res) => ServiceInvoke(ContentService.post(req.body), res);
  
  static list = async (req, res) => ServiceInvoke(ContentService.list(req.query.page, req.query.pageSize, req.query.search, req.query.featured), res);
}

module.exports = ContentController;
