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
    const result = await partRepo.createPart(part);
    assert(result.part.id === part.id);
    assert (result.err === null);
    id = result.part.id;
  });

  it('Reads part form DB', async function() {
    const result = await partRepo.findPart(id);
    assert(result.part.id === id);
    assert (result.err === null);
  });

  it('Deletes part from DB', async function () {
    const result = await partRepo.deletePart(id);
    const result1 = await partRepo.findPart(id);
    assert(result1.part === null);
    assert(result.err === null);
  });
});
