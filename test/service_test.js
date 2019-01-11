const assert = require('assert');
const ServiceModel = require('../api/models/service');
var serviceRepo = require('../api/repo/serviceRepo');

describe('Testing service Repo', function() {
  let id;

  before (async function () {
    await ServiceModel.deleteMany();
  });

  it('Saves service to DB', async function() {
    const service = new ServiceModel({name:'تغيير زيت'});
    const a = await serviceRepo.createService(service);
    assert(a.service.id == service.id);
    assert(a.err == null);
    id = a.service.id;
  });

  it('Reads service form DB', async function() {
    const b = await serviceRepo.findService(id);
    assert(b.service.id == id);
    assert(b.err == null);
  });

  it('Deletes service from DB', async function () {
    const d = await serviceRepo.deleteService(id);
    const s = await serviceRepo.findService(id);
    assert(s.service == null);
    assert(d.err == null);
  });
});
