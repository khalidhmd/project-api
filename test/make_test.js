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
    const a = await makeRepo.createMake(make);
    assert(a.make.id == make.id);
    assert(a.err == null);
    id = a.make.id;
  });

  it('Reads car make form DB', async function() {
    const b = await makeRepo.findMake(id);
    assert(b.make.id == id);
    assert(b.err == null);
  });
  
  it('Adds model to make-models in DB', async function () {  
    const c = await makeRepo.addModel(id, [{name: 'Verna', logo: 'logoPath'}]);
    assert(c.make.models[0].name == 'Verna');
    assert(c.make.models[0].logo == 'logoPath');
    assert(c.err == null);
  });

  it('Deletes model from make-models in DB', async function () {
    const d = await makeRepo.deleteModel(id, "Verna");
    assert(d.make.models.length == 0);
    assert(d.err == null);
  });
  
  it('Deletes car make from DB', async function () {
    const result = await makeRepo.deleteMake(id);
    const m = await makeRepo.findMake(id);
    assert(m.make == null);
    assert(result.err == null);
  });
});

