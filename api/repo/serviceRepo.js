const ServiceModel = require('../models/service');

const createService = async (service) => {
  const result = await ServiceModel.create(service);
  return result;
}

const findService = async (id) => {
  const result = await ServiceModel.findById(id);
  return result;
}

const deleteService = async (id) => {
  await ServiceModel.findByIdAndRemove(id);
}

module.exports.createService = createService;
module.exports.findService = findService;
module.exports.deleteService = deleteService;