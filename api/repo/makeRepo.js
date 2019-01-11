const MakeModel = require('../models/make');

const createMake = async (make) => {
  const result = {};
  try {
    result.make = await MakeModel.create(make);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findMake = async (id) => {
  const result = {};
  try {
    result.make = await MakeModel.findById(id);
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
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteMake = async (id) => {
  const result = {};
  try {
    await MakeModel.findByIdAndRemove(id);
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