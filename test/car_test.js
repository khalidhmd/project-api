const assert = require("chai").assert;
const CarModel = require("../api/models/car");
const carRepo = require("../api/repo/carRepo");
const statusRepo = require("../api/repo/statusRepo");
const defaultRepo = require("../api/repo/defaultRepo");
const userRepo = require("../api/repo/userRepo");
const UserModel = require("../api/models/user");

describe("Testing car Repo repo", function() {
  this.timeout(5000);
  let id, userId;

  before(async function() {
    await CarModel.deleteMany();
    await UserModel.deleteMany();
    await statusRepo.createStatus({ name: "تغيير زيت", nextkm: 20 });
    await defaultRepo.createDefault({ name: "تغيير زيت" });
    const { user } = await userRepo.createUser({
      name: "user 1",
      password: "password",
      email: "email 1",
      mobile: "mobile 1",
      gov: "gov 1",
      zone: "zone 1"
    });
    userId = user.id;
  });

  it("Saves user car to DB", async function() {
    const car = new CarModel({ make: "Hundai", model: "Verna" });
    const result = await carRepo.createCar(car, userId);
    const { user } = await userRepo.findUser(userId);
    assert.isNull(result.err);
    assert.strictEqual(result.car.id, car.id);
    assert.lengthOf(result.car.servicedefaults, 1);
    assert.lengthOf(result.car.servicestatuses, 1);
    assert.lengthOf(user.cars, 1);
    assert.lengthOf(result.cars, 1);
    id = result.car.id;
  });

  it("Reads user car form DB", async function() {
    const result = await carRepo.findCar(id);
    assert.isNull(result.err);
    assert.strictEqual(result.car.id, id);
  });

  it("Updates user car millage (km) in DB", async function() {
    const result = await carRepo.updateCarkm(id, 55);
    assert.strictEqual(result.car.km, 55);
    assert.isNull(result.err);
  });

  it("Adds servicedefaults to user car in DB", async function() {
    const result = await carRepo.addServicedefault(id, [
      { name: "تغيير تيل فرامل" },
      { name: "تغيير دورة تبريد" }
    ]);
    assert.strictEqual(result.car.servicedefaults[2].name, "تغيير دورة تبريد");
    assert.strictEqual(result.car.servicedefaults[2].km, 10);
    assert.lengthOf(result.car.servicedefaults, 3);
    assert.isNull(result.err);
  });

  it("Deletes servicedefault from user car in DB", async function() {
    const result = await carRepo.deleteServicedefault(id, "تغيير زيت");
    assert.lengthOf(result.car.servicedefaults, 2);
    assert.isNull(result.err);
  });

  it("Adds servicestatus to user car in DB", async function() {
    const result = await carRepo.addServicestatus(id, [
      { name: "تغيير دورة تبريد", nextkm: 20 }
    ]);
    assert.strictEqual(result.car.servicestatuses[1].name, "تغيير دورة تبريد");
    assert.strictEqual(result.car.servicestatuses[1].nextkm, 20);
    assert.lengthOf(result.car.servicestatuses, 2);
    assert.isNull(result.err);
  });

  it("Deletes servicestatus from user car in DB", async function() {
    const result = await carRepo.deleteServicestatus(id, "تغيير زيت");
    assert.lengthOf(result.car.servicestatuses, 1);
    assert.isNull(result.err);
  });

  it("Deletes user car from DB", async function() {
    await carRepo.deleteCar(id, userId);
    const result = await carRepo.findCar(id, userId);
    const { user } = await userRepo.findUser(userId);
    assert.lengthOf(user.cars, 0);
    assert.isNull(result.car);
    assert.isNull(result.err);
  });
});
