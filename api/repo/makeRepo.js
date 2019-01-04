const MakeModel = require('../models/make');

const saveMake = async (make) => {
  const result = await MakeModel.create(make);
  return result;
}

const findMake = async (id) => {
  const result = await MakeModel.findById(id);
  return result;
}

const addModel = async (make, model) => {
  make.models.push(model);
  const result = await make.save();
  return result;
}

const deleteModel = async (makeId, model) => {
  const make = await MakeModel.findById(makeId)
  make.models.splice(make.models.indexOf(model),1);
  const result = await make.save();
  return result;
}

const deleteMake = async (id) => {
  await MakeModel.findByIdAndRemove(id);
}

module.exports.saveMake = saveMake;
module.exports.findMake = findMake;
module.exports.addModel = addModel;
module.exports.deleteModel = deleteModel;
module.exports.deleteMake = deleteMake;