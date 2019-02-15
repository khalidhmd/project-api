const assert = require("chai").assert;
const ServicelogModel = require("../api/models/servicelog");
const servicelogRepo = require("../api/repo/servicelogRepo");
const userRepo = require("../api/repo/userRepo");
const carRepo = require("../api/repo/carRepo");
const CarModel = require("../api/models/car");
const UserModel = require("../api/models/user");
const { DefaultModel } = require("../api/models/servicedefault");
const { StatusModel } = require("../api/models/servicestatus");
const statusRepo = require("../api/repo/statusRepo");
const defaultRepo = require("../api/repo/defaultRepo");

describe("Testing service log Repo", function() {
  this.timeout(5000);
  let log;
  let carid;

  before(async function() {
    await UserModel.deleteMany();
    await ServicelogModel.deleteMany();
    await CarModel.deleteMany();
    await statusRepo.createStatus({ name: "تغيير زيت" });
    await defaultRepo.createDefault({ name: "تغيير زيت", km: 10, months: 12 });
    const { user } = await userRepo.createUser({
      name: "user 1",
      password: "password",
      email: "email 1",
      mobile: "mobile 1",
      gov: "gov 1",
      zone: "zone 1"
    });
    const { car } = await carRepo.createCar(
      {
        make: "Mitsubishi",
        model: "Lancer",
        km: 5
      },
      user.id
    );
    carid = car.id;
  });

  it("Saves service log to DB", async function() {
    const servicelog = new ServicelogModel({
      name: "تغيير زيت",
      carid: carid
    });
    const result = await servicelogRepo.createServicelog(servicelog);
    const { car } = await carRepo.findCar(carid);
    assert.strictEqual(car.km, result.servicelog.km);
    assert.strictEqual(result.servicelog.id, servicelog.id);
    const nextdate = new Date();
    nextdate.setDate(nextdate.getDay() + 12 * 30);
    const serviceStatus = car.servicestatuses.find(
      e => e.name === result.servicelog.name
    );
    assert.strictEqual(serviceStatus.nextkm, car.km + 10);
    assert.strictEqual(
      serviceStatus.nextdate.setHours(0, 0, 0, 0),
      nextdate.setHours(0, 0, 0, 0)
    );
    assert.isNull(result.err);
    log = result.servicelog;
  });

  it("Reads service log form DB", async function() {
    const result = await servicelogRepo.findServicelogs(carid);
    assert.strictEqual(result.servicelogs[0].id, log.id);
    assert.isNull(result.err);
  });

  it("Deletes service log from DB", async function() {
    const result = await servicelogRepo.deleteServicelog(log.id);
    const result1 = await servicelogRepo.findServicelogs(carid);
    assert.lengthOf(result1.servicelogs, 0);
    assert.isNull(result.err);
  });
});
