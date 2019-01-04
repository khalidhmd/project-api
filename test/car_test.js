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
    a = await carRepo.saveCar(car);
    assert(a.id == car.id);
    id = a.id;
  });

  it('Reads user car form DB', async function() {
    const b = await carRepo.findCar(id);
    assert(b.id == id);
  });
  
  it('Adds servicedefault to user car in DB', async function () {  
    const car = await carRepo.findCar(id);
    await carRepo.addServicedefault(car, {name: 'تغيير زيت'});
    const c = await carRepo.findCar(id);
    assert(c.servicedefaults[0].name == 'تغيير زيت');
    assert(c.servicedefaults[0].km == 10)
  });

  it('Deletes servicedefault from user car in DB', async function () {
    const d = await carRepo.deleteServicedefault(id, "تغيير زيت");
    assert(d.servicedefaults.length == 0);
  });

  it('Adds servicestatus to user car in DB', async function () {  
    const car = await carRepo.findCar(id);
    await carRepo.addServicestatus(car, {name: 'تغيير زيت', nextkm: 20});
    const c = await carRepo.findCar(id);
    assert(c.servicestatuses[0].name == 'تغيير زيت');
    assert(c.servicestatuses[0].nextkm == 20)
  });

  it('Deletes servicestatus from user car in DB', async function () {
    const d = await carRepo.deleteServicestatus(id, "تغيير زيت");
    assert(d.servicestatuses.length == 0);
  });
  
  it('Deletes user car from DB', async function () {
    await carRepo.deleteCar(id);
    const car = await carRepo.findCar(id);
    assert(car == null);
  });
});

