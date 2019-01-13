const ServiceModel = require('../models/service');

const createService = async (service) => {
  const result = {};
  try {
    result.service = await ServiceModel.create(service);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findService = async (id) => {
  const result = {};
  try {
    result.service = await ServiceModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteService = async (id) => {
  const result = {};
  try {
    await ServiceModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createService = createService;
module.exports.findService = findService;
module.exports.deleteService = deleteService;