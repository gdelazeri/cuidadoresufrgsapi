const bcrypt = require('bcrypt');

const ContentModel = require('../models/content');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');

class ContentService {
  static async post(body) {
    try {
      // Check required fields
      if (!body.title) {
        return new Response(null, ErrorTypes.C001);
      }

      // Get the content
      const content = await ContentModel.add(body);
      if (content) {
        return new Response(content);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }

  static async get(id) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.C002);
      }
      
      // Get the content
      const content = await ContentModel.getById(id);
      if (content) {
        return new Response(content);
      }
      return new Response(null, ErrorTypes.C002);
    } catch (error) {
      throw error;
    }
  }

  static async list(page, pageSize, search, featured) {
    try {
      // Check required fields
      if (isNaN(page) || Number(page) < 0 || isNaN(pageSize) || Number(pageSize) < 0) {
        return new Response(null, ErrorTypes.C001);
      }

      const match = { };
      if (featured !== null && featured !== undefined) {
        match.featured = featured === 'true';
      }
      if (typeof search === 'string' && search.length > 0) {
        const split = search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,' ').split(' ').filter(s => s.length > 0);
        const searchQuery = [];
        for (let i = 0; i < split.length; i += 1) {
          searchQuery.push({ title: { '$regex': split[i], '$options' : 'i' } });
          searchQuery.push({ subtitle: { '$regex': split[i], '$options' : 'i' } });
          searchQuery.push({ 'body.text': { '$regex': split[i], '$options' : 'i' } });
          searchQuery.push({ source: { '$regex': split[i], '$options' : 'i' } });
        }
        if (searchQuery.length > 0) {
          match.$or = searchQuery;
        }
      }

      const pipeline = [];
      if (Object.keys(match).length > 0) pipeline.push({ $match: match });
      pipeline.push({ $sort: { createdAt: -1 } });
      pipeline.push({ $skip: Number(page) * Number(pageSize) });
      pipeline.push({ $limit: Number(pageSize) });

      // List contents
      const list = await ContentModel.aggregate(pipeline);
      if (list) {
        return new Response(list);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContentService;
