const CarModel = require('../models/car');

const saveCar = async (car) => {
  const result = await CarModel.create(car);
  return result;
}

const findCar = async (id) => {
  const result = await CarModel.findById(id);
  return result;
}

const addServicedefault = async (car, servicedefault) => {
  car.servicedefaults.push(servicedefault);
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

const addServicestatus = async (car, servicestatus) => {
  car.servicestatuses.push(servicestatus);
  const result = await car.save();
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

module.exports.saveCar = saveCar;
module.exports.findCar = findCar;
module.exports.addServicedefault = addServicedefault;
module.exports.deleteServicedefault = deleteServicedefault;
module.exports.addServicestatus = addServicestatus;
module.exports.deleteServicestatus = deleteServicestatus;
module.exports.deleteCar = deleteCar;