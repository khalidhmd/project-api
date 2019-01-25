const PartModel = require("../models/part");

module.exports.createPart = async part => {
  const result = {};
  try {
    result.part = await PartModel.create(part);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findPart = async id => {
  const result = {};
  try {
    result.part = await PartModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deletePart = async id => {
  const result = {};
  try {
    await PartModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
