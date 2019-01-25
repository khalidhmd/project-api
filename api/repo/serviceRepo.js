const ServiceModel = require("../models/service");

module.exports.createService = async service => {
  const result = {};
  try {
    result.service = await ServiceModel.create(service);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findService = async id => {
  const result = {};
  try {
    result.service = await ServiceModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteService = async id => {
  const result = {};
  try {
    await ServiceModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
