const assert = require("chai").assert;
const UserModel = require("../api/models/user");
var userRepo = require("../api/repo/userRepo");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Testing user Repo repo", function() {
  let id;
  let carId, postId;

  before(async function() {
    await UserModel.deleteMany();
  });

  it("Saves ( signup ) user to DB with password hashed", async function() {
    const user = new UserModel({
      name: "user 1",
      password: "password",
      email: "email 1",
      mobile: "mobile 1",
      gov: "gov 1",
      zone: "zone 1"
    });
    const result = await userRepo.createUser(user);
    assert.strictEqual(result.user.id, user.id);
    assert.isTrue(await bcrypt.compare("password", result.user.password));
    assert.isNull(result.err);
    id = result.user.id;
  });

  it("Reads user by Id form DB", async function() {
    const result = await userRepo.findUser(id);
    assert.strictEqual(result.user.id, id);
    assert.isNull(result.err);
  });

  it("Signs user in by email", async function() {
    const result = await userRepo.signinByEmail("email 1", "password");
    const decoded = await jwt.verify(result.token, "secret");
    assert.strictEqual(id, decoded.userId);
    assert.isNull(result.err);
  });

  it("Signs user in by mobile", async function() {
    const result = await userRepo.signinByMobile("mobile 1", "password");
    const decoded = await jwt.verify(result.token, "secret");
    assert.strictEqual(id, decoded.userId);
    assert.isNull(result.err);
  });

  it("changes photo of user in DB", async function() {
    const photo = "changed";
    const result = await userRepo.changePhoto(id, photo);
    assert.strictEqual(result.user.photo, photo);
    assert.isNull(result.err);
  });

  it("Adds cars to user cars in DB", async function() {
    carId = mongoose.Types.ObjectId();
    const result = await userRepo.addCar(id, carId);
    assert.strictEqual(result.user.cars[0].toString(), carId.toString());
    assert.lengthOf(result.user.cars, 1);
    assert.isNull(result.err);
  });

  it("Adds post to user posts in DB", async function() {
    postId = mongoose.Types.ObjectId();
    const result = await userRepo.addPost(id, postId);
    assert.strictEqual(result.user.posts[0].toString(), postId.toString());
    assert.lengthOf(result.user.posts, 1);
    assert.isNull(result.err);
  });

  it("Deletes post from user posts in DB", async function() {
    const result = await userRepo.deletePost(id, postId);
    assert.lengthOf(result.user.posts, 0);
    assert.isNull(result.err);
  });

  it("Deletes car from user cars in DB", async function() {
    const result = await userRepo.deleteCar(id, carId);
    assert.lengthOf(result.user.cars, 0);
    assert.isNull(result.err);
  });

  it("changes email of user in DB", async function() {
    const email = "changed";
    const result = await userRepo.changeEmail(id, email);
    assert.strictEqual(result.user.email, email);
    assert.isNull(result.err);
  });

  it("changes mobile of user in DB", async function() {
    const mobile = "changed";
    const result = await userRepo.changeMobile(id, mobile);
    assert.strictEqual(result.user.mobile, mobile);
    assert.isNull(result.err);
  });

  it("changes gov of user in DB", async function() {
    const gov = "changed";
    const result = await userRepo.changeGov(id, gov);
    assert.strictEqual(result.user.gov, gov);
    assert.isNull(result.err);
  });

  it("changes display name of user in DB", async function() {
    const name = "changed";
    const result = await userRepo.changeName(id, name);
    assert.strictEqual(result.user.name, name);
    assert.isNull(result.err);
  });

  it("changes zone of user in DB", async function() {
    const zone = "changed";
    const result = await userRepo.changeZone(id, zone);
    assert.strictEqual(result.user.zone, zone);
    assert.isNull(result.err);
  });

  it("Deletes user from DB", async function() {
    const result = await userRepo.deleteUser(id);
    const result1 = await userRepo.findUser(id);
    assert.isNull(result1.user);
    assert.isNull(result.err);
  });
});
