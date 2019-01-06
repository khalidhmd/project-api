const assert = require('assert');
const ServicelogModel = require('../api/models/servicelog');
const servicelogRepo = require('../api/repo/servicelogRepo');
const mongoose = require('mongoose')

describe('Testing service log Repo', function() {
  let id;
  let carid;

  before (async function () {
    await ServicelogModel.deleteMany();
  });

  it('Saves service log to DB', async function() {
    const servicelog = new ServicelogModel({name:'تغيير زيت', carid: mongoose.Types.ObjectId()});
    const a = await servicelogRepo.createServicelog(servicelog);
    assert(a.id == servicelog.id);
    id = a.id;
    carid = servicelog.carid;
  });

  it('Reads service log form DB', async function() {
    const b = await servicelogRepo.findServicelog(carid);
    assert(b[0].id == id);
  });

  it('Deletes service log from DB', async function () {
    await servicelogRepo.deleteServicelog(id);
    const servicelog = await servicelogRepo.findServicelog(id);
    assert(servicelog[0] == null);
  });
});
