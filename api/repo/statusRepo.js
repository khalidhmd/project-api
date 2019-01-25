const { StatusModel } = require("../models/servicestatus");

module.exports.createStatus = async serviceStatus => {
  const result = {};
  try {
    result.serviceStatus = await StatusModel.create(serviceStatus);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findStatus = async id => {
  const result = {};
  try {
    result.serviceStatus = await StatusModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.updateStatus = async serviceStatus => {
  const result = {};
  try {
    result.serviceStatus = await StatusModel.findByIdAndUpdate(
      serviceStatus.id,
      serviceStatus,
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteStatus = async id => {
  const result = {};
  try {
    await StatusModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
