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
    a = await carRepo.craeteCar(car);
    assert(a.err == null);
    assert(a.car.id == car.id);
    id = a.car.id;
  });

  it('Reads user car form DB', async function() {
    const b = await carRepo.findCar(id);
    assert(b.err == null);
    assert(b.car.id == id);
  });

  it('Updates user car millage (km) in DB', async function () {
    const g = await carRepo.updateCarkm(id, 55);
    assert(g.car.km == 55);
    assert(g.err == null);
  });
  
  it('Adds servicedefaults to user car in DB', async function () {  
    const c = await carRepo.addServicedefault(id, [{name: 'تغيير زيت'}, {name: 'تغيير دورة تبريد'}]);
    assert(c.car.servicedefaults[0].name == 'تغيير زيت');
    assert(c.car.servicedefaults[0].km == 10)
    assert(c.err == null);
  });

  it('Deletes servicedefault from user car in DB', async function () {
    const d = await carRepo.deleteServicedefault(id, "تغيير زيت");
    assert(d.car.servicedefaults.length == 1);
    assert(d.err == null);
  });

  it('Adds servicestatus to user car in DB', async function () {  
    const e = await carRepo.addServicestatus(id, [{name: 'تغيير زيت', nextkm: 20}]);
    assert(e.car.servicestatuses[0].name == 'تغيير زيت');
    assert(e.car.servicestatuses[0].nextkm == 20);
    assert(e.err == null);
  });

  it('Deletes servicestatus from user car in DB', async function () {
    const f = await carRepo.deleteServicestatus(id, "تغيير زيت");
    assert(f.car.servicestatuses.length == 0);
    assert(f.err == null);
  });
  
  it('Deletes user car from DB', async function () {
    await carRepo.deleteCar(id);
    const result = await carRepo.findCar(id);
    assert(result.car == null);
    assert(result.err == null);
  });
});

