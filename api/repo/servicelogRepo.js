const ServicelogModel = require("../models/servicelog");

module.exports.createServicelog = async servicelogs => {
  const result = {};
  try {
    result.servicelogs = await ServicelogModel.insertMany(servicelogs);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findServicelogs = async carId => {
  const result = {};
  try {
    result.servicelogs = await ServicelogModel.find()
      .where("carid")
      .equals(carId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteServicelog = async id => {
  const result = {};
  try {
    await ServicelogModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
