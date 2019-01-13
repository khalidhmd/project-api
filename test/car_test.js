const assert = require('assert');
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
    assert(result.err === null);
    assert(result.car.id === car.id);
    id = result.car.id;
  });

  it('Reads user car form DB', async function() {
    const result = await carRepo.findCar(id);
    assert(result.err === null);
    assert(result.car.id === id);
  });

  it('Updates user car millage (km) in DB', async function () {
    const result = await carRepo.updateCarkm(id, 55);
    assert(result.car.km === 55);
    assert(result.err === null);
  });
  
  it('Adds servicedefaults to user car in DB', async function () {  
    const result = await carRepo.addServicedefault(id, [{name: 'تغيير زيت'}, {name: 'تغيير دورة تبريد'}]);
    assert(result.car.servicedefaults[0].name === 'تغيير زيت');
    assert(result.car.servicedefaults[0].km === 10)
    assert(result.err === null);
  });

  it('Deletes servicedefault from user car in DB', async function () {
    const result = await carRepo.deleteServicedefault(id, "تغيير زيت");
    assert(result.car.servicedefaults.length === 1);
    assert(result.err === null);
  });

  it('Adds servicestatus to user car in DB', async function () {  
    const result = await carRepo.addServicestatus(id, [{name: 'تغيير زيت', nextkm: 20}]);
    assert(result.car.servicestatuses[0].name === 'تغيير زيت');
    assert(result.car.servicestatuses[0].nextkm === 20);
    assert(result.err === null);
  });

  it('Deletes servicestatus from user car in DB', async function () {
    const result = await carRepo.deleteServicestatus(id, "تغيير زيت");
    assert(result.car.servicestatuses.length === 0);
    assert(result.err === null);
  });
  
  it('Deletes user car from DB', async function () {
    await carRepo.deleteCar(id);
    const result = await carRepo.findCar(id);
    assert(result.car === null);
    assert(result.err === null);
  });
});

