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
    result = await makeRepo.saveMake(make);
    assert(result.id == make.id);
    id = result.id;
  });

  it('Reads car make form DB', async function() {
    fetchedMake = await makeRepo.findMake(id);
    assert(result.id == id);
  });
  
  it('Adds model to make-models in DB', async function () {  
    const make = await makeRepo.findMake(id);
    await makeRepo.addModel(make, {name: 'Verna', logo: 'logoPath'});
    const result = await makeRepo.findMake(id);
    assert(result.models[0].name == 'Verna');
    assert(result.models[0].logo == 'logoPath')
  });

  it('Deletes model from make-models in DB', async function () {
    const result = await makeRepo.deleteModel(id, "Verna");
    assert(result.models.length == 0);
  });
  
  it('Deletes car make from DB', async function () {
    await makeRepo.deleteMake(id);
    const make = await makeRepo.findMake(id);
    assert(make == null);
  });
});
