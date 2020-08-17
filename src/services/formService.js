const FormModel = require('../models/form');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');

class FormService {
  static async post(body) {
    try {
      // Check required fields
      if (!body.title) {
        return new Response(null, ErrorTypes.F001);
      }

      // Add the form
      const form = await FormModel.add(body);
      if (form) {
        return new Response(form);
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
        return new Response(null, ErrorTypes.F001);
      }

      // Add the form
      body._id = id;
      const form = await FormModel.put(body);
      if (form) {
        return new Response(form);
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
        return new Response(null, ErrorTypes.F002);
      }
      
      // Get the form
      const form = await FormModel.getById(id);
      if (form) {
        return new Response(form);
      }
      return new Response(null, ErrorTypes.F002);
    } catch (error) {
      throw error;
    }
  }

  static async list(page, pageSize, search) {
    try {
      const match = { active: true };
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
      pipeline.push({ $project: { questions: 0, options: 0 } });

      // List forms
      const list = await FormModel.aggregate(pipeline);
      if (list) {
        return new Response(list);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FormService;
