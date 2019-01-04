const PartModel = require('../models/part');

const savePart = async (part) => {
  const result = await PartModel.create(part);
  return result;
}

const findPart = async (id) => {
  const result = await PartModel.findById(id);
  return result;
}

const deletePart = async (id) => {
  await PartModel.findByIdAndRemove(id);
}

module.exports.savePart = savePart;
module.exports.findPart = findPart;
module.exports.deletePart = deletePart;