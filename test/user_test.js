const assert = require('assert');
const UserModel = require('../api/models/user');
var userRepo = require('../api/repo/userRepo');
const mongoose = require('mongoose');

describe('Testing user Repo repo', function() {
  let id;
  let carId;

  before (async function () {
    await UserModel.deleteMany();
  });

  it('Saves user to DB', async function() {
    const user = new UserModel({
      name:'user 1',
      login: 'login 1',
      hashpassword: 'hash 1',
      salt: 'salt 1',
      email: 'email 1',
      mobile: 'mobile 1',
      gov: 'gov 1',
      zone: 'zone 1'
    });
    a = await userRepo.createUser(user);
    assert(a.id == user.id);
    id = a.id;
  });

  it('Reads user by Id form DB', async function() {
    const b = await userRepo.findUser(id);
    assert(b.id == id);
  });

  
  it('Adds car to user cars in DB', async function () {  
    const user = await userRepo.findUser(id);
    carId = [mongoose.Types.ObjectId()]
    const c = await userRepo.addCar(user, carId);
    assert(c.cars[0].toString() == carId.toString());
  });

  it('changes photo of user in DB', async function () {  
    const photo = 'photo path'
    const c = await userRepo.changePhoto(id, photo);
    assert(c.photo == photo);
  });

  it('Deletes car from user cars in DB', async function () {
    const d = await userRepo.deleteCar(id, carId);
    assert(d.cars.length == 0);
  });
  
  it('changes email of user in DB', async function () {  
    const email = 'email 1'
    const c = await userRepo.changeEmail(id, email);
    assert(c.email == email);
  });

  it('changes mobile of user in DB', async function () {  
    const mobile = 'mobile 1'
    const c = await userRepo.changeMobile(id, mobile);
    assert(c.mobile == mobile);
  });

  it('changes gov of user in DB', async function () {  
    const gov = 'gov 1'
    const c = await userRepo.changeGov(id, gov);
    assert(c.gov == gov);
  });

  it('changes display name of user in DB', async function () {  
    const name = 'name 1'
    const c = await userRepo.changeName(id, name);
    assert(c.name == name);
  });

  it('changes zone of user in DB', async function () {  
    const zone = 'zone 1'
    const c = await userRepo.changeZone(id, zone);
    assert(c.zone == zone);
  });
  
  it('Deletes user from DB', async function () {
    await userRepo.deleteUser(id);
    const user = await userRepo.findUser(id);
    assert(user == null);
  });
});

