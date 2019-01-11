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
    assert(a.part.id == part.id);
    assert (a.err == null);
    id = a.part.id;
  });

  it('Reads part form DB', async function() {
    const b = await partRepo.findPart(id);
    assert(b.part.id == id);
    assert (b.err == null);
  });

  it('Deletes part from DB', async function () {
    const a = await partRepo.deletePart(id);
    const p = await partRepo.findPart(id);
    assert(p.part == null);
    assert (a.err == null);
  });
});
