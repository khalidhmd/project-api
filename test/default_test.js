const assert = require("chai").assert;
const { DefaultModel } = require("../api/models/servicedefault");
var defaultRepo = require("../api/repo/defaultRepo");

describe("Testing default Repo", function() {
  let id;

  before(async function() {
    await DefaultModel.deleteMany();
  });

  it("Saves service default to DB", async function() {
    const serviceDefault = new DefaultModel({ name: "تغيير زيت" });
    const result = await defaultRepo.createDefault(serviceDefault);
    assert.strictEqual(result.serviceDefault.id, serviceDefault.id);
    assert.isNull(result.err);
    id = result.serviceDefault.id;
  });

  it("Reads service default form DB", async function() {
    const result = await defaultRepo.findDefault(id);
    assert.strictEqual(result.serviceDeafault.id, id);
    assert.isNull(result.err);
  });

  it("Updates service default form DB", async function() {
    let result = await defaultRepo.findDefault(id);
    result.serviceDeafault.km = 20;
    result.serviceDeafault.months = 6;
    result.serviceDeafault.name = "1تغيير زيت";
    result = await defaultRepo.updateDefault(result.serviceDeafault);
    assert.strictEqual(result.serviceDefault.id, id);
    assert.strictEqual(result.serviceDefault.km, 20);
    assert.strictEqual(result.serviceDefault.months, 6);
    assert.strictEqual(result.serviceDefault.name, "1تغيير زيت");
    assert.isNull(result.err);
  });

  it("Deletes service default from DB", async function() {
    const result = await defaultRepo.deleteDefault(id);
    const result1 = await defaultRepo.findDefault(id);
    assert.isNull(result1.serviceDeafault);
    assert.isNull(result.err);
  });
});
