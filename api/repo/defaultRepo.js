const { DefaultModel } = require("../models/servicedefault");

module.exports.createDefault = async serviceDefault => {
  const result = {};
  try {
    result.serviceDefault = await DefaultModel.create(serviceDefault);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findDefault = async id => {
  const result = {};
  try {
    result.serviceDeafault = await DefaultModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.updateDefault = async serviceDefault => {
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

module.exports.deleteDefault = async id => {
  const result = {};
  try {
    await DefaultModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
