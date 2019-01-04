const assert = require('assert');
const PartModel = require('../api/models/part');
var partRepo = require('../api/repo/partRepo');

describe('Testing partRepo repo', function() {
  let id;

  before (async function () {
    await PartModel.deleteMany();
  });

  it('Saves parts to DB', async function() {
    const part = new PartModel({name:'مارش'});
    result = await partRepo.savePart(part);
    assert(result.id == part.id);
    id = result.id;
  });

  it('Reads part form DB', async function() {
    const result = await partRepo.findPart(id);
    assert(result.id == id);
  });

  it('Deletes part from DB', async function () {
    await partRepo.deletePart(id);
    const part = await partRepo.findPart(id);
    assert(part == null);
  });
});
