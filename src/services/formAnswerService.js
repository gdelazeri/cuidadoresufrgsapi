const FormAnswerModel = require('../models/formAnswer');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');

class FormAnswerService {
  static async post(body) {
    try {
      // Check required fields
      if (!body || !body.userId || !body.formId) {
        return new Response(null, ErrorTypes.A001);
      }

      // Add the form answer
      const formAnswer = await FormAnswerModel.add(body);
      if (formAnswer) {
        return new Response(formAnswer);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }

  static async put(id, body) {
    try {
      // Check required fields
      if (!id || !body || !body.userId || !body.formId) {
        return new Response(null, ErrorTypes.A001);
      }

      // Add the form answer
      body._id = id;
      const formAnswer = await FormAnswerModel.put(body);
      if (formAnswer) {
        return new Response(formAnswer);
      }
      return new Response(null, ErrorTypes.G000);
    } catch (error) {
      throw error;
    }
  }

  static async get(userId, formId) {
    try {
      // Check required fields
      if (!userId || !formId) {
        return new Response(null, ErrorTypes.A002);
      }
      
      // Get the form answer
      const formAnswer = await FormAnswerModel.get(userId, formId);
      if (formAnswer) {
        return new Response(formAnswer);
      }
      return new Response(null, ErrorTypes.A002);
    } catch (error) {
      throw error;
    }
  }

  static async finish(id) {
    try {
      // Check required fields
      if (!id) {
        return new Response(null, ErrorTypes.A002);
      }
      
      // Get the form answer
      const formAnswer = await FormAnswerModel.finish(id);
      if (formAnswer) {
        return new Response(formAnswer);
      }
      return new Response(null, ErrorTypes.A002);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FormAnswerService;
