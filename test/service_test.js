const assert = require('chai').assert;
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
    assert.strictEqual(result.service.id, service.id);
    assert.isNull(result.err);
    id = result.service.id;
  });

  it('Reads service form DB', async function() {
    const result = await serviceRepo.findService(id);
    assert.strictEqual(result.service.id, id);
    assert.isNull(result.err);
  });

  it('Deletes service from DB', async function () {
    const result = await serviceRepo.deleteService(id);
    const result1 = await serviceRepo.findService(id);
    assert.isNull(result1.service);
    assert.isNull(result.err);
  });
});
