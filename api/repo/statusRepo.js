const { StatusModel } = require("../models/servicestatus");

const createStatus = async serviceStatus => {
  const result = {};
  try {
    result.serviceStatus = await StatusModel.create(serviceStatus);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const findStatus = async id => {
  const result = {};
  try {
    result.serviceStatus = await StatusModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const updateStatus = async serviceStatus => {
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

const deleteStatus = async id => {
  const result = {};
  try {
    await StatusModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.createStatus = createStatus;
module.exports.findStatus = findStatus;
module.exports.deleteStatus = deleteStatus;
module.exports.updateStatus = updateStatus;
