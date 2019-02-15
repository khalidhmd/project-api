const assert = require("chai").assert;
const MakeModel = require("../api/models/make");
const makeRepo = require("../api/repo/makeRepo");

describe("Testing makeRepo repo", function() {
  this.timeout(5000);
  let id;

  before(async function() {
    await MakeModel.deleteMany();
  });

  it("Saves car make to DB", async function() {
    const make = new MakeModel({ name: "Hundai", logo: "logoPath" });
    const result = await makeRepo.createMake(make);
    assert.strictEqual(result.make.id, make.id);
    assert.isNull(result.err);
    id = result.make.id;
  });

  it("Reads car make form DB", async function() {
    const result = await makeRepo.findMake(id);
    assert.strictEqual(result.make.id, id);
    assert.isNull(result.err);
  });

  it("Adds model to make-models in DB", async function() {
    const result = await makeRepo.addModel(id, [
      { name: "Verna", logo: "logoPath" }
    ]);
    assert.strictEqual(result.make.models[0].name, "Verna");
    assert.strictEqual(result.make.models[0].logo, "logoPath");
    assert.isNull(result.err);
  });

  it("Deletes model from make-models in DB", async function() {
    const result = await makeRepo.deleteModel(id, "Verna");
    assert.lengthOf(result.make.models, 0);
    assert.isNull(result.err);
  });

  it("Deletes car make from DB", async function() {
    const result = await makeRepo.deleteMake(id);
    const result1 = await makeRepo.findMake(id);
    assert.isNull(result1.make, null);
    assert.isNull(result.err);
  });
});
