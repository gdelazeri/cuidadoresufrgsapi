const log = require('../config/log');
const ErrorTypes = require('../helpers/ErrorTypes');
const Response = require('../helpers/Response');

const ServiceInvoke = async (service, res) => {
  try {
    const response = await service;
    if (response.success) {
      return res.status(200).send(response);
    }
    return res.status(400).send(response);
  } catch (e) {
    log.error(e);
    return res.status(500).send(new Response(null, ErrorTypes.G000));
  }
}

module.exports = ServiceInvoke;
