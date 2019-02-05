const ServicelogModel = require("../models/servicelog");
const carRepo = require("./carRepo");

module.exports.createServicelog = async servicelog => {
  const result = {};
  let oldCarKm, oldDate, oldNextKm;
  try {
    const { car } = await carRepo.findCar(servicelog.carid);
    const default1 = car.servicedefaults.find(e => e.name === servicelog.name);
    servicelog.km = car.km;
    oldCarKm = car.km;
    //calculate nextdate
    const nextdate = new Date();
    nextdate.setDate(nextdate.getDay() + default1.months * 30);
    // update nextkm and nextdate in servicestatus for this specific service name
    car.servicestatuses = car.servicestatuses.map(e => {
      if (e.name === servicelog.name) {
        e.nextkm = car.km + default1.km;
        oldDate = e.nextdate;
        oldNextKm = e.nextkm;
        e.nextdate = nextdate;
      }
      return e;
    });
    await car.save();
    result.servicelog = await ServicelogModel.create(servicelog);
    result.err = null;
  } catch (err) {
    if (result.servicelog)
      await ServicelogModel.findByIdAndDelete(result.servicelog.id);
    car.km = oldCarKm;
    car.servicestatuses = car.servicestatuses.map(e => {
      if (e.name === servicelog.name) {
        e.nextkm = oldNextKm;
        e.nextdate = oldDate;
      }
      return e;
    });
    result.err = err;
  }
  return result;
};

module.exports.findServicelogs = async carId => {
  const result = {};
  try {
    result.servicelogs = await ServicelogModel.find()
      .where("carid")
      .equals(carId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteServicelog = async id => {
  const result = {};
  try {
    await ServicelogModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
