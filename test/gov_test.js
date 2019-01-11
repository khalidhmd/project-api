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
    const a = await govRepo.createGov(gov);
    console.log(a)
    assert(a.gov.id == gov.id);
    console.log(a.err)
    assert(a.err == null);
    id = a.gov.id;
  });

  it('Reads Governorate form DB', async function() {
    const b = await govRepo.findGov(id);
    assert(b.gov.id == id);
    assert(b.err == null);
  });
  
  it('Adds zone to gov zones in DB', async function () {  
    const c = await govRepo.addZone(id, 'الأميرية');
    assert(c.gov.zones[0] == 'الأميرية');
    assert(c.err == null);
  });

  it('Deletes zone from gov zones in DB', async function () {
    const d = await govRepo.deleteZone(id, "الأميرية");
    assert(d.gov.zones.length == 0);
    assert(d.err == null);
  });
  
  it('Deletes Gov from DB', async function () {
    await govRepo.deleteGov(id);
    const d = await govRepo.findGov(id);
    assert(d.gov == null);
    assert(d.err == null);
  });
});
