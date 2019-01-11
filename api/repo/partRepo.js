const PartModel = require('../models/part');

const createPart = async (part) => {
  const result = {};
  try {
    result.part = await PartModel.create(part);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findPart = async (id) => {
  const result = {};
  try {
    result.part = await PartModel.findById(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deletePart = async (id) => {
  const result = {};
  try {
    await PartModel.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createPart = createPart;
module.exports.findPart = findPart;
module.exports.deletePart = deletePart;