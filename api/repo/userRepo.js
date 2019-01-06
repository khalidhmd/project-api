const UserModel = require('../models/user');

const createUser = async (user) => {
  const result = await UserModel.create(user);
  return result;
}

const findUser = async (id) => {
  const result = await UserModel.findById(id);
  return result;
}

const changePhoto = async (userId, photoPath) => {
  const result = await UserModel.findByIdAndUpdate(userId, { photo: photoPath }, { new: true });
  return result;
}

const changeEmail = async (userId, email) => {
  const result = await UserModel.findByIdAndUpdate(userId, { email: email }, { new: true });
  return result;
}

const changeMobile = async (userId, mobile) => {
  const result = await UserModel.findByIdAndUpdate(userId, { mobile: mobile }, { new: true });
  return result;
}

const changeGov = async (userId, gov) => {
  const result = await UserModel.findByIdAndUpdate(userId, { gov: gov }, { new: true });
  return result;
}

const changeZone = async (userId, zone) => {
  const result = await UserModel.findByIdAndUpdate(userId, { zone: zone }, { new: true });
  return result;
}

const changeName = async (userId, name) => {
  const result = await UserModel.findByIdAndUpdate(userId, { name: name }, { new: true });
  return result;
}

const addCar = async (user, carIds) => {
  user.cars = [...user.cars, ...carIds];
  const result = await user.save();
  return result;
}

const deleteCar = async (userId, carId) => {
  const user = await UserModel.findById(userId)
  let cars = user.cars.filter( obj => obj.toString() != carId.toString());
  user.cars = cars;
  const result = await user.save();
  return result;
}

const deleteUser = async (id) => {
  await UserModel.findByIdAndRemove(id);
}

module.exports.createUser = createUser;
module.exports.findUser = findUser;
module.exports.changePhoto = changePhoto;
module.exports.changeEmail = changeEmail;
module.exports.changeMobile = changeMobile;
module.exports.changeGov = changeGov;
module.exports.changeZone = changeZone;
module.exports.changeName = changeName;
module.exports.deleteUser = deleteUser;
module.exports.addCar = addCar;
module.exports.deleteCar = deleteCar;