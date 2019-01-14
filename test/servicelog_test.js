const assert = require('chai').assert;
const ServicelogModel = require('../api/models/servicelog');
const servicelogRepo = require('../api/repo/servicelogRepo');
const mongoose = require('mongoose')

describe('Testing service log Repo', function() {
  let logs;
  let carid;

  before (async function () {
    await ServicelogModel.deleteMany();
  });

  it('Saves service log to DB', async function() {
    const servicelogs = [];
    const carId = new mongoose.Types.ObjectId();
    servicelogs.push(new ServicelogModel({name:'تغيير زيت', carid: carId }));
    servicelogs.push(new ServicelogModel({name:'دورة تبريد', carid: carId }));
    const result = await servicelogRepo.createServicelog(servicelogs);
    assert.strictEqual(result.servicelogs[0].id, servicelogs[0].id);
    assert.lengthOf(result.servicelogs, 2);
    assert.isNull(result.err);
    logs = result.servicelogs;
    carid = carId;
  });

  it('Reads service log form DB', async function() {
    const result = await servicelogRepo.findServicelogs(carid);
    assert.strictEqual(result.servicelogs[0].id, logs[0].id);
    assert.isNull(result.err);
  });

  it('Deletes service log from DB', async function () {
    const result = await servicelogRepo.deleteServicelog(logs[0].id);
    const result1 = await servicelogRepo.findServicelogs(carid);
    assert.lengthOf(result1.servicelogs, 1);
    assert.isNull(result.err);
  });
});
