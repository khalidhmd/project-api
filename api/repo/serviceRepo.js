const ServiceModel = require('../models/service');

const saveService = async (service) => {
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

module.exports.saveService = saveService;
module.exports.findService = findService;
module.exports.deleteService = deleteService;