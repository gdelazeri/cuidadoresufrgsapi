const ContentModel = require('../models/content');
const ContentCategoryModel = require('../models/contentCategory');
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

  static async put(id, body) {
    try {
      // Check required fields
      if (!id || !body.title) {
        return new Response(null, ErrorTypes.C001);
      }

      // Get the content
      body._id = id;
      const content = await ContentModel.put(body);
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
        if (content.categoryId) {
          const category = await ContentCategoryModel.getById(content.categoryId);
          if (category) content.category = category;
        }
        return new Response(content);
      }
      return new Response(null, ErrorTypes.C002);
    } catch (error) {
      throw error;
    }
  }

  static async list(page, pageSize, search, home) {
    try {
      const match = { active: true };
      if (home !== null && home !== undefined) {
        match.home = home === 'true';
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
      pipeline.push({ $match: match });
      pipeline.push({ $sort: { createdAt: -1 } });
      if (!isNaN(page) && Number(page) >= 0 && !isNaN(pageSize) && Number(pageSize) > 0) {
        pipeline.push({ $skip: Number(page) * Number(pageSize) });
        pipeline.push({ $limit: Number(pageSize) });
      }
      pipeline.push({
        $lookup: {
          from: 'contentCategories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories'
        }
      });
      pipeline.push({ $addFields: { category: { $arrayElemAt: [ '$categories', 0 ] } } });
      pipeline.push({ $project: { categories: 0 } });

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
