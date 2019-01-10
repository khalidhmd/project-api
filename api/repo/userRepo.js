const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  const result = await UserModel.create(user);
  return result;
}

const findUser = async (id) => {
  const result = await UserModel.findById(id);
  return result;
}

const signinByEmail = async (email, password) => {
  const result = await UserModel.findOne().where('email').equals(email);
  if (!result) return;
  const checked = await bcrypt.compare(password,result.password)
  if(checked) {
    const token = jwt.sign({userId: result.id},'secret', {expiresIn: '7d'});
    return token;
  }
}

const signinByMobile = async (mobile, password) => {
  const result = await UserModel.findOne().where('mobile').equals(mobile);
  if (!result) return;
  const checked = await bcrypt.compare(password,result.password)
  if(checked) {
    const token = jwt.sign({userId: result.id},'secret', {expiresIn: '7d'});
    return token;
  }
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

const addCar = async (userId, carIds) => {
  const user = await UserModel.findById(userId)
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
module.exports.signinByEmail = signinByEmail;
module.exports.signinByMobile = signinByMobile;