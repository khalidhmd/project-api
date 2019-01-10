const CarModel = require('../models/car');

const craeteCar = async (car) => {
  const result = {};
  try {
    result.car = await CarModel.create(car);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findCar = async (id) => {
  const result = {};
  try {
    result.car = await CarModel.findById(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addServicedefault = async (carId, servicedefaults) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(carId, {
      $addToSet: { servicedefaults: { $each: servicedefaults }}
    }, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteServicedefault = async (carId, servicename) => {
  const result = {};
  try {
    const car = await CarModel.findById(carId)
    let servicedefaults = car.servicedefaults.filter( obj => obj.name != servicename);
    car.servicedefaults = servicedefaults;
    result.car = await car.save();
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addServicestatus = async (carId, servicestatuses) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(carId, {
      $addToSet: { servicestatuses: { $each: servicestatuses }}
    }, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const updateCarkm = async (carId, value) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(carId,{ km: value }, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteServicestatus = async (carId, servicename) => {
  const result = {};
  try {
    const car = await CarModel.findById(carId)
    let servicestatuses = car.servicestatuses.filter( obj => obj.name != servicename);
    car.servicestatuses = servicestatuses;
    result.car = await car.save();
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteCar = async (id) => {
  const result = {};
  try {
    await CarModel.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
}

module.exports.craeteCar = craeteCar;
module.exports.findCar = findCar;
module.exports.addServicedefault = addServicedefault;
module.exports.deleteServicedefault = deleteServicedefault;
module.exports.addServicestatus = addServicestatus;
module.exports.deleteServicestatus = deleteServicestatus;
module.exports.deleteCar = deleteCar;
module.exports.updateCarkm = updateCarkm;