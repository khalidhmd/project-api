const assert = require("chai").assert;
const GovModel = require("../api/models/gov");
const govRepo = require("../api/repo/govRepo");

describe("Testing govRepo repo", function() {
  let id;

  before(async function() {
    await GovModel.deleteMany();
  });

  it("Saves Governorate to DB", async function() {
    const gov = new GovModel({ name: "القاهرة" });
    const result = await govRepo.createGov(gov);
    assert.strictEqual(result.gov.id, gov.id);
    assert.isNull(result.err);
    id = result.gov.id;
  });

  it("Reads Governorate form DB", async function() {
    const result = await govRepo.findGov(id);
    assert.strictEqual(result.gov.id, id);
    assert.isNull(result.err);
  });

  it("Adds zone to gov zones in DB", async function() {
    const result = await govRepo.addZone(id, "الأميرية");
    assert.strictEqual(result.gov.zones[0], "الأميرية");
    assert.lengthOf(result.gov.zones, 1);
    assert.isNull(result.err);
  });

  it("Deletes zone from gov zones in DB", async function() {
    const result = await govRepo.deleteZone(id, "الأميرية");
    assert.lengthOf(result.gov.zones, 0);
    assert.isNull(result.err);
  });

  it("Deletes Gov from DB", async function() {
    await govRepo.deleteGov(id);
    const result = await govRepo.findGov(id);
    assert.isNull(result.gov);
    assert.isNull(result.err);
  });
});
