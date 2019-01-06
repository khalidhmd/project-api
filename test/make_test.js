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
    a = await makeRepo.createMake(make);
    assert(a.id == make.id);
    id = a.id;
  });

  it('Reads car make form DB', async function() {
    const b = await makeRepo.findMake(id);
    assert(b.id == id);
  });
  
  it('Adds model to make-models in DB', async function () {  
    const make = await makeRepo.findMake(id);
    const c = await await makeRepo.addModel(make, [{name: 'Verna', logo: 'logoPath'}]);
    assert(c.models[0].name == 'Verna');
    assert(c.models[0].logo == 'logoPath')
  });

  it('Deletes model from make-models in DB', async function () {
    const d = await makeRepo.deleteModel(id, "Verna");
    assert(d.models.length == 0);
  });
  
  it('Deletes car make from DB', async function () {
    await makeRepo.deleteMake(id);
    const make = await makeRepo.findMake(id);
    assert(make == null);
  });
});

