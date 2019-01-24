const { DefaultModel } = require("../models/servicedefalt");

const createDefault = async serviceDefault => {
  const result = {};
  try {
    result.serviceDefault = await DefaultModel.create(serviceDefault);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const findDefault = async id => {
  const result = {};
  try {
    result.serviceDeafault = await DefaultModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const updateDefault = async serviceDefault => {
  const result = {};
  try {
    result.serviceDefault = await DefaultModel.findByIdAndUpdate(
      serviceDefault.id,
      serviceDefault,
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

const deleteDefault = async id => {
  const result = {};
  try {
    await DefaultModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.createDefault = createDefault;
module.exports.findDefault = findDefault;
module.exports.deleteDefault = deleteDefault;
module.exports.updateDefault = updateDefault;
