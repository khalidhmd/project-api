const MakeModel = require("../models/make");

module.exports.createMake = async make => {
  const result = {};
  try {
    result.make = await MakeModel.create(make);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findMake = async id => {
  const result = {};
  try {
    result.make = await MakeModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }

  return result;
};

module.exports.addModel = async (makeId, models) => {
  const result = {};
  try {
    result.make = await MakeModel.findByIdAndUpdate(
      makeId,
      { $addToSet: { models: { $each: models } } },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteModel = async (makeId, model) => {
  const result = {};
  try {
    const make = await MakeModel.findById(makeId);
    make.models.splice(make.models.indexOf(model), 1);
    result.make = await make.save();
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteMake = async id => {
  const result = {};
  try {
    await MakeModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
