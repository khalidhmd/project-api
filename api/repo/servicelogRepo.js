const ServicelogModel = require('../models/servicelog');

const saveServicelog = async (servicelog) => {
  const result = await ServicelogModel.create(servicelog);
  return result;
}

const findServicelog = async (carId) => {
  const result = await ServicelogModel.find().where('carid').equals(carId);
  return result;
}

const deleteServicelog = async (id) => {
  await ServicelogModel.findByIdAndRemove(id);
}

module.exports.saveServicelog = saveServicelog;
module.exports.findServicelog = findServicelog;
module.exports.deleteServicelog = deleteServicelog;