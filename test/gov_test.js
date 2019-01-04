const assert = require('assert');
const GovModel = require('../api/models/gov');
var govRepo = require('../api/repo/govRepo');

describe('Testing govRepo repo', function() {
  let id;

  before (async function () {
    await GovModel.deleteMany();
  });

  it('Saves Governorate to DB', async function() {
    const gov = new GovModel({name:'القاهرة'});
    const a = await govRepo.saveGov(gov);
    assert(a.id == gov.id);
    id = a.id;
  });

  it('Reads Governorate form DB', async function() {
    const b = await govRepo.findGov(id);
    assert(b.id == id);
  });
  
  it('Adds zone to gov zones in DB', async function () {  
    const gov = await govRepo.findGov(id);
    await govRepo.addZone(gov, 'الأميرية');
    const c = await govRepo.findGov(id);
    assert(c.zones[0] == 'الأميرية');
  });

  it('Deletes zone from gov zones in DB', async function () {
    const d = await govRepo.deleteZone(id, "الأميرية");
    assert(d.zones.length == 0);
  });
  
  it('Deletes Gov from DB', async function () {
    await govRepo.deleteGov(id);
    const gov = await govRepo.findGov(id);
    assert(gov == null);
  });
});
