const ServiceModel = require('../models/service');

const createService = async (service) => {
  const result = {};
  try {
    result.service = await ServiceModel.create(service);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findService = async (id) => {
  const result = {};
  try {
    result.service = await ServiceModel.findById(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteService = async (id) => {
  const result = {};
  try {
    await ServiceModel.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createService = createService;
module.exports.findService = findService;
module.exports.deleteService = deleteService;