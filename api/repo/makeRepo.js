const MakeModel = require('../models/make');

const createMake = async (make) => {
  const result = {};
  try {
    result.make = await MakeModel.create(make);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findMake = async (id) => {
  const result = {};
  try {
    result.make = await MakeModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }

  return result;
}

const addModel = async (makeId, models) => {
  const result = {};
  try {
    result.make = await MakeModel
    .findByIdAndUpdate(makeId, { $addToSet: { models: { $each: models }}}, { new: true});
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteModel = async (makeId, model) => {
  const result = {};
  try {
    const make = await MakeModel.findById(makeId)
    make.models.splice(make.models.indexOf(model),1);
    result.make = await make.save();
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteMake = async (id) => {
  const result = {};
  try {
    await MakeModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createMake = createMake;
module.exports.findMake = findMake;
module.exports.addModel = addModel;
module.exports.deleteModel = deleteModel;
module.exports.deleteMake = deleteMake;