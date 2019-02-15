const assert = require("chai").assert;
const { StatusModel } = require("../api/models/servicestatus");
const statusRepo = require("../api/repo/statusRepo");

describe("Testing status Repo", function() {
  this.timeout(5000);
  let id;

  before(async function() {
    await StatusModel.deleteMany();
  });

  it("Saves service status to DB", async function() {
    const serviceStatus = new StatusModel({ name: "تغيير زيت", nextkm: 20 });
    const result = await statusRepo.createStatus(serviceStatus);
    assert.strictEqual(result.serviceStatus.id, serviceStatus.id);
    assert.isNull(result.err);
    id = result.serviceStatus.id;
  });

  it("Reads service status form DB", async function() {
    const result = await statusRepo.findStatus(id);
    assert.strictEqual(result.serviceStatus.id, id);
    assert.isNull(result.err);
  });

  it("Updates service status form DB", async function() {
    let result = await statusRepo.findStatus(id);
    result.serviceStatus.nextkm = 20;
    result.serviceStatus.nextdate = new Date("1/1/2018");
    result.serviceStatus.name = "1تغيير زيت";
    result = await statusRepo.updateStatus(result.serviceStatus);
    assert.strictEqual(result.serviceStatus.id, id);
    assert.strictEqual(result.serviceStatus.nextkm, 20);
    assert.strictEqual(
      result.serviceStatus.nextdate.toString(),
      new Date("1/1/2018").toString()
    );
    assert.strictEqual(result.serviceStatus.name, "1تغيير زيت");
    assert.isNull(result.err);
  });

  it("Deletes service status from DB", async function() {
    const result = await statusRepo.deleteStatus(id);
    const result1 = await statusRepo.findStatus(id);
    assert.isNull(result1.serviceStatus);
    assert.isNull(result.err);
  });
});
