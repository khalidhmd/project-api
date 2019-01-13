const assert = require('assert');
const MakeModel = require('../api/models/make');
var makeRepo = require('../api/repo/makeRepo');

describe('Testing makeRepo repo', function() {
  let id;

  before (async function () {
    await MakeModel.deleteMany();
  });

  it('Saves car make to DB', async function() {
    const make = new MakeModel({name:'Hundai', logo: 'logoPath'});
    const result = await makeRepo.createMake(make);
    assert(result.make.id === make.id);
    assert(result.err === null);
    id = result.make.id;
  });

  it('Reads car make form DB', async function() {
    const result = await makeRepo.findMake(id);
    assert(result.make.id === id);
    assert(result.err === null);
  });
  
  it('Adds model to make-models in DB', async function () {  
    const result = await makeRepo.addModel(id, [{name: 'Verna', logo: 'logoPath'}]);
    assert(result.make.models[0].name === 'Verna');
    assert(result.make.models[0].logo === 'logoPath');
    assert(result.err === null);
  });

  it('Deletes model from make-models in DB', async function () {
    const result = await makeRepo.deleteModel(id, "Verna");
    assert(result.make.models.length === 0);
    assert(result.err === null);
  });
  
  it('Deletes car make from DB', async function () {
    const result = await makeRepo.deleteMake(id);
    const result1 = await makeRepo.findMake(id);
    assert(result1.make === null);
    assert(result.err === null);
  });
});

