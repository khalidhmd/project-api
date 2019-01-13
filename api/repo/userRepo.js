const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (user) => {
  const result = {};
  try {
    user.password = await bcrypt.hash(user.password, 10);
    result.user = await UserModel.create(user);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findUser = async (id) => {
  const result = {};
  try {
    result.user = await UserModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const signinByEmail = async (email, password) => {
  const result = {};
  try {
    const user = await UserModel.findOne().where('email').equals(email);
    if (user) {
      const checked = await bcrypt.compare(password, user.password);
      if(checked) {
        result.token = jwt.sign({userId: user.id},'secret', {expiresIn: '7d'});
        result.err = null;
      } 
    }
  } catch (err) {
    result.err = err
  }
  return result;  
}

const signinByMobile = async (mobile, password) => {
  const result = {};
  try {
    const user = await UserModel.findOne().where('mobile').equals(mobile);
    if (user) {
      const checked = await bcrypt.compare(password,user.password)
      if(checked) {
        result.token = jwt.sign({userId: user.id},'secret', {expiresIn: '7d'});
        result.err = null;
      }
    }
  } catch (err) {
    result.err = err;
  }
  return result;
}

const changePhoto = async (userId, photoPath) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { photo: photoPath }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const changeEmail = async (userId, email) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { email: email }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const changeMobile = async (userId, mobile) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { mobile: mobile }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const changeGov = async (userId, gov) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { gov: gov }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const changeZone = async (userId, zone) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { zone: zone }, { new: true });
    result.err = null;
  } catch (err) {
    result.err;
  }
  return result;
}

const changeName = async (userId, name) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, { name: name }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addCars = async (userId, carIds) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, {
      $addToSet: {cars: {$each: carIds}}
    }, { new: true});
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteCar = async (userId, carId) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(userId, {
      $pull: {cars: carId}
    }, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteUser = async (id) => {
  const result = {};
  try {
    await UserModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
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
module.exports.addCars = addCars;
module.exports.deleteCar = deleteCar;
module.exports.signinByEmail = signinByEmail;
module.exports.signinByMobile = signinByMobile;