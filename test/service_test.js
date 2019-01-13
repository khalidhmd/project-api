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
    const result = await serviceRepo.createService(service);
    assert(result.service.id === service.id);
    assert(result.err === null);
    id = result.service.id;
  });

  it('Reads service form DB', async function() {
    const result = await serviceRepo.findService(id);
    assert(result.service.id === id);
    assert(result.err === null);
  });

  it('Deletes service from DB', async function () {
    const result = await serviceRepo.deleteService(id);
    const result1 = await serviceRepo.findService(id);
    assert(result1.service === null);
    assert(result.err === null);
  });
});
