const assert = require('assert');
const UserModel = require('../api/models/user');
var userRepo = require('../api/repo/userRepo');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Testing user Repo repo', function() {
  let id;
  let carId;

  before (async function() {
    await UserModel.deleteMany();
  });

  it('Saves ( signup ) user to DB with password hashed', async function() {
    const user = new UserModel({
      name:'user 1',
      password: 'password',
      email: 'email 1',
      mobile: 'mobile 1',
      gov: 'gov 1',
      zone: 'zone 1'
    });
    a = await userRepo.createUser(user);
    assert(a.id == user.id);
    assert(await bcrypt.compare('password', a.password));
    id = a.id;
  });

  it('Reads user by Id form DB', async function() {
    const b = await userRepo.findUser(id);
    assert(b.id == id);
  });

  it('Signs user in by emai', async function () {
    const token = await userRepo.signinByEmail('email 1', 'password');
    const decoded = await jwt.verify(token, 'secret');
    assert(id == decoded.userId);
  });

  it('Signs user in by mobile', async function () {
    const token = await userRepo.signinByMobile('mobile 1', 'password');
    const decoded = await jwt.verify(token, 'secret');
    assert(id == decoded.userId);
  });

  it('Adds car to user cars in DB', async function () {  
    carId = [mongoose.Types.ObjectId()]
    const c = await userRepo.addCar(id, carId);
    assert(c.cars[0].toString() == carId.toString());
  });

  it('changes photo of user in DB', async function () {  
    const photo = 'changed'
    const c = await userRepo.changePhoto(id, photo);
    assert(c.photo == photo);
  });

  it('Deletes car from user cars in DB', async function () {
    const d = await userRepo.deleteCar(id, carId);
    assert(d.cars.length == 0);
  });
  
  it('changes email of user in DB', async function () {  
    const email = 'changed'
    const c = await userRepo.changeEmail(id, email);
    assert(c.email == email);
  });

  it('changes mobile of user in DB', async function () {  
    const mobile = 'changed'
    const c = await userRepo.changeMobile(id, mobile);
    assert(c.mobile == mobile);
  });

  it('changes gov of user in DB', async function () {  
    const gov = 'changed'
    const c = await userRepo.changeGov(id, gov);
    assert(c.gov == gov);
  });

  it('changes display name of user in DB', async function () {  
    const name = 'changed'
    const c = await userRepo.changeName(id, name);
    assert(c.name == name);
  });

  it('changes zone of user in DB', async function () {  
    const zone = 'changed'
    const c = await userRepo.changeZone(id, zone);
    assert(c.zone == zone);
  });
  
  it('Deletes user from DB', async function () {
    await userRepo.deleteUser(id);
    const user = await userRepo.findUser(id);
    assert(user == null);
  });
});

