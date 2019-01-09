const CarModel = require('../models/car');

const craeteCar = async (car) => {
  const result = await CarModel.create(car);
  return result;
}

const findCar = async (id) => {
  const result = await CarModel.findById(id);
  return result;
}

const addServicedefault = async (carId, servicedefaults) => {
  const car = await CarModel.findById(carId)
  car.servicedefaults = [...car.servicedefaults, ...servicedefaults]
  const result = await car.save();
  return result;
}

const deleteServicedefault = async (carId, servicename) => {
  const car = await CarModel.findById(carId)
  let servicedefaults = car.servicedefaults.filter( obj => obj.name != servicename);
  car.servicedefaults = servicedefaults;
  const result = await car.save();
  return result;
}

const addServicestatus = async (carId, servicestatuses) => {
  const car = await CarModel.findById(carId);
  car.servicestatuses = [...car.servicestatuses, ...servicestatuses];
  const result = await car.save();
  return result;
}

const updateCarkm = async (carId, value) => {
  const result = await CarModel.findByIdAndUpdate(carId,{ km: value }, { new: true });
  return result;
}

const deleteServicestatus = async (carId, servicename) => {
  const car = await CarModel.findById(carId)
  let servicestatuses = car.servicestatuses.filter( obj => obj.name != servicename);
  car.servicestatuses = servicestatuses;
  const result = await car.save();
  return result;
}

const deleteCar = async (id) => {
  await CarModel.findByIdAndRemove(id);
}

module.exports.craeteCar = craeteCar;
module.exports.findCar = findCar;
module.exports.addServicedefault = addServicedefault;
module.exports.deleteServicedefault = deleteServicedefault;
module.exports.addServicestatus = addServicestatus;
module.exports.deleteServicestatus = deleteServicestatus;
module.exports.deleteCar = deleteCar;
module.exports.updateCarkm = updateCarkm;