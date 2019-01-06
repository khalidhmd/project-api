const PartModel = require('../models/part');

const createPart = async (part) => {
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

module.exports.createPart = createPart;
module.exports.findPart = findPart;
module.exports.deletePart = deletePart;