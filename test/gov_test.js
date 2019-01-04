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
    result = await govRepo.saveGov(gov);
    assert(result.id == gov.id);
    id = result.id;
  });

  it('Reads Governorate form DB', async function() {
    const result = await govRepo.findGov(id);
    assert(result.id == id);
  });
  
  it('Adds zone to gov zones in DB', async function () {  
    const gov = await govRepo.findGov(id);
    await govRepo.addZone(gov, 'الأميرية');
    const result = await govRepo.findGov(id);
    assert(result.zones[0] == 'الأميرية');
  });

  it('Deletes zone from gov zones in DB', async function () {
    const result = await govRepo.deleteZone(id, "الأميرية");
    assert(result.zones.length == 0);
  });
  
  it('Deletes Gov from DB', async function () {
    await govRepo.deleteGov(id);
    const gov = await govRepo.findGov(id);
    assert(gov == null);
  });
});
