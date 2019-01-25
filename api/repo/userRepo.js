const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.createUser = async user => {
  const result = {};
  try {
    user.password = await bcrypt.hash(user.password, 10);
    result.user = await UserModel.create(user);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.findUser = async id => {
  const result = {};
  try {
    result.user = await UserModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.signinByEmail = async (email, password) => {
  const result = {};
  try {
    const user = await UserModel.findOne()
      .where("email")
      .equals(email);
    if (user) {
      const checked = await bcrypt.compare(password, user.password);
      if (checked) {
        result.token = jwt.sign({ userId: user.id }, "secret", {
          expiresIn: "7d"
        });
        result.err = null;
      }
    }
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.signinByMobile = async (mobile, password) => {
  const result = {};
  try {
    const user = await UserModel.findOne()
      .where("mobile")
      .equals(mobile);
    if (user) {
      const checked = await bcrypt.compare(password, user.password);
      if (checked) {
        result.token = jwt.sign({ userId: user.id }, "secret", {
          expiresIn: "7d"
        });
        result.err = null;
      }
    }
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.changePhoto = async (userId, photoPath) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { photo: photoPath },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.changeEmail = async (userId, email) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { email: email },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.changeMobile = async (userId, mobile) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { mobile: mobile },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.changeGov = async (userId, gov) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { gov: gov },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.changeZone = async (userId, zone) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { zone: zone },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err;
  }
  return result;
};

module.exports.changeName = async (userId, name) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addCar = async (userId, carId) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { cars: carId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addPost = async (userId, postId) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { posts: postId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteCar = async (userId, carId) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { cars: carId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deletePost = async (userId, postId) => {
  const result = {};
  try {
    result.user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $pull: { posts: postId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteUser = async id => {
  const result = {};
  try {
    await UserModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
