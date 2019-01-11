const GovModel = require('../models/gov');

const createGov = async (gov) => {
  const result = {};
  try {
    result.gov = await GovModel.create(gov);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addZone = async (govId, zone) => {
  const result = {};
  try {
    result.gov = await GovModel.findByIdAndUpdate(govId, { $addToSet: { zones: zone} }, { new: true});
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findGov = async (id) => {
  const result = {};
  try {
    result.gov = await GovModel.findById(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteZone = async (govId, zone) => {
  const result = {};
  try {
    result.gov = await GovModel.findByIdAndUpdate(govId, { $pull: {zones: zone}}, { new: true});
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteGov = async (id) => {
  const result = {};
  try {
    await GovModel.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createGov = createGov;
module.exports.findGov = findGov;
module.exports.addZone = addZone;
module.exports.deleteZone = deleteZone;
module.exports.deleteGov = deleteGov;