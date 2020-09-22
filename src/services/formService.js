const mongoose = require('mongoose');

const FormModel = require('../models/form');
const FormAnswerModel = require('../models/formAnswer');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');
const FormCalculator = require('../helpers/FormCalculator');

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

  static async list(userId, page, pageSize, search) {
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

      if (typeof userId === 'string' && userId.length > 0) {
        pipeline.push({
          $lookup: {
            from: 'formAnswers',
            localField: '_id',
            foreignField: 'formId',
            as: 'formAnswers'
          }
        });
        pipeline.push({
          $addFields: {
            formAnswer: {
              $filter: {
                input: '$formAnswers',
                as: "f",
                cond: {
                  $and: [
                    { $eq: ["$$f.userId", mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$$f.finished", true] }
                  ]
                }
              }
            }
          }
        });
        pipeline.push({
          $addFields: {
            finished: { $cond: [ { $eq: [ { $size: "$formAnswer" }, 1 ] }, true, false ] }
          }
        });
      }

      pipeline.push({
        $project: {
          introduction: 0,
          classification: 0,
          domains: 0,
          questions: 0,
          options: 0,
          formAnswers: 0,
          formAnswer: 0,
        }
      });

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

  static async result(id, userId) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.F002);
      }
      
      // Get the form
      const form = await FormModel.getById(id);
      if (form) {
        const formAnswer = await FormAnswerModel.get(userId, id);
        if (formAnswer) {
          const formCalculator = new FormCalculator(form, formAnswer);
          const result = formCalculator.calculate();
          return new Response(result);
        }
        return new Response(null, ErrorTypes.F002);
      }
      return new Response(null, ErrorTypes.F002);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FormService;
