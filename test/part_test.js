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
    const a = await partRepo.createPart(part);
    assert(a.id == part.id);
    id = a.id;
  });

  it('Reads part form DB', async function() {
    const b = await partRepo.findPart(id);
    assert(b.id == id);
  });

  it('Deletes part from DB', async function () {
    await partRepo.deletePart(id);
    const part = await partRepo.findPart(id);
    assert(part == null);
  });
});
