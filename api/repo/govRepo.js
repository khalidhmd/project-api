const GovModel = require("../models/gov");

module.exports.createGov = async gov => {
  const result = {};
  try {
    result.gov = await GovModel.create(gov);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addZone = async (govId, zone) => {
  const result = {};
  try {
    result.gov = await GovModel.findByIdAndUpdate(
      govId,
      { $addToSet: { zones: zone } },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findGov = async id => {
  const result = {};
  try {
    result.gov = await GovModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteZone = async (govId, zone) => {
  const result = {};
  try {
    result.gov = await GovModel.findByIdAndUpdate(
      govId,
      { $pull: { zones: zone } },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteGov = async id => {
  const result = {};
  try {
    await GovModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
