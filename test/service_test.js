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
    assert(a.id == service.id);
    id = a.id;
  });

  it('Reads service form DB', async function() {
    const b = await serviceRepo.findService(id);
    assert(b.id == id);
  });

  it('Deletes service from DB', async function () {
    await serviceRepo.deleteService(id);
    const service = await serviceRepo.findService(id);
    assert(service == null);
  });
});
