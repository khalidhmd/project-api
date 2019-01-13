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
    const result = await govRepo.createGov(gov);
    assert(result.gov.id === gov.id);
    assert(result.err === null);
    id = result.gov.id;
  });

  it('Reads Governorate form DB', async function() {
    const result = await govRepo.findGov(id);
    assert(result.gov.id === id);
    assert(result.err === null);
  });
  
  it('Adds zone to gov zones in DB', async function () {  
    const result = await govRepo.addZone(id, 'الأميرية');
    assert(result.gov.zones[0] === 'الأميرية');
    assert(result.err === null);
  });

  it('Deletes zone from gov zones in DB', async function () {
    const result = await govRepo.deleteZone(id, "الأميرية");
    assert(result.gov.zones.length === 0);
    assert(result.err === null);
  });
  
  it('Deletes Gov from DB', async function () {
    await govRepo.deleteGov(id);
    const result = await govRepo.findGov(id);
    assert(result.gov === null);
    assert(result.err === null);
  });
});
