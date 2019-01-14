const assert = require('chai').assert;
const CarModel = require('../api/models/car');
var carRepo = require('../api/repo/carRepo');

describe('Testing car Repo repo', function() {
  let id;

  before (async function () {
    await CarModel.deleteMany();
  });

  it('Saves user car to DB', async function() {
    const car = new CarModel({make:'Hundai', model: 'Verna'});
    const result = await carRepo.craeteCar(car);
    assert.isNull(result.err);
    assert.strictEqual(result.car.id, car.id);
    id = result.car.id;
  });

  it('Reads user car form DB', async function() {
    const result = await carRepo.findCar(id);
    assert.isNull(result.err);
    assert.strictEqual(result.car.id, id);
  });

  it('Updates user car millage (km) in DB', async function () {
    const result = await carRepo.updateCarkm(id, 55);
    assert.strictEqual(result.car.km, 55);
    assert.isNull(result.err);
  });
  
  it('Adds servicedefaults to user car in DB', async function () {  
    const result = await carRepo.addServicedefault(id, [{name: 'تغيير زيت'}, {name: 'تغيير دورة تبريد'}]);
    assert.strictEqual(result.car.servicedefaults[0].name, 'تغيير زيت');
    assert.strictEqual(result.car.servicedefaults[0].km, 10);
    assert.lengthOf(result.car.servicedefaults, 2);
    assert.isNull(result.err);
  });

  it('Deletes servicedefault from user car in DB', async function () {
    const result = await carRepo.deleteServicedefault(id, "تغيير زيت");
    assert.lengthOf(result.car.servicedefaults, 1);
    assert.isNull(result.err);
  });

  it('Adds servicestatus to user car in DB', async function () {  
    const result = await carRepo.addServicestatus(id, [{name: 'تغيير زيت', nextkm: 20}]);
    assert.strictEqual(result.car.servicestatuses[0].name, 'تغيير زيت');
    assert(result.car.servicestatuses[0].nextkm, 20);
    assert.lengthOf(result.car.servicestatuses, 1)
    assert.isNull(result.err);
  });

  it('Deletes servicestatus from user car in DB', async function () {
    const result = await carRepo.deleteServicestatus(id, "تغيير زيت");
    assert.lengthOf(result.car.servicestatuses, 0);
    assert.isNull(result.err);
  });
  
  it('Deletes user car from DB', async function () {
    await carRepo.deleteCar(id);
    const result = await carRepo.findCar(id);
    assert.isNull(result.car);
    assert.isNull(result.err);
  });
});

