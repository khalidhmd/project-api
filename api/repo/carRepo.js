const CarModel = require("../models/car");
const { DefaultModel } = require("../models/servicedefault");
const { StatusModel } = require("../models/servicestatus");
const userRepo = require("./userRepo");

module.exports.createCar = async (car, userId) => {
  const result = {};
  try {
    const defaults = await DefaultModel.find();
    const statuses = await StatusModel.find();
    car.servicedefaults = defaults;
    car.servicestatuses = statuses;
    result.car = await CarModel.create(car);
    const { user } = await userRepo.addCar(userId, result.car.id);
    result.cars = user.cars;
    result.err = null;
  } catch (err) {
    if (result.car) await CarModel.findByIdAndDelete(result.car.id);
    if (result.cars) await userRepo.deleteCar(userId, result.car.id);
    result.err = err;
  }
  return result;
};

module.exports.findCar = async id => {
  const result = {};
  try {
    result.car = await CarModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addServicedefault = async (carId, servicedefaults) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(
      carId,
      {
        $addToSet: { servicedefaults: { $each: servicedefaults } }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteServicedefault = async (carId, servicename) => {
  const result = {};
  try {
    const car = await CarModel.findById(carId);
    let servicedefaults = car.servicedefaults.filter(
      obj => obj.name != servicename
    );
    car.servicedefaults = servicedefaults;
    result.car = await car.save();
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addServicestatus = async (carId, servicestatuses) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(
      carId,
      {
        $addToSet: { servicestatuses: { $each: servicestatuses } }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.updateCarkm = async (carId, value) => {
  const result = {};
  try {
    result.car = await CarModel.findByIdAndUpdate(
      carId,
      { km: value },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteServicestatus = async (carId, servicename) => {
  const result = {};
  try {
    const car = await CarModel.findById(carId);
    let servicestatuses = car.servicestatuses.filter(
      obj => obj.name != servicename
    );
    car.servicestatuses = servicestatuses;
    result.car = await car.save();
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteCar = async (id, userId) => {
  const result = {};
  try {
    await CarModel.findByIdAndRemove(id);
    await userRepo.deleteCar(userId, id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
};
