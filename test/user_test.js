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
    assert(a.user.id == user.id);
    assert(await bcrypt.compare('password', a.user.password));
    assert(a.err == null);
    id = a.user.id;
  });

  it('Reads user by Id form DB', async function() {
    const b = await userRepo.findUser(id);
    assert(b.user.id == id);
    assert(b.err == null);
  });

  it('Signs user in by email', async function () {
    const result = await userRepo.signinByEmail('email 1', 'password');
    const decoded = await jwt.verify(result.token, 'secret');
    assert(id == decoded.userId);
    assert(result.err == null);
  });

  it('Signs user in by mobile', async function () {
    const result = await userRepo.signinByMobile('mobile 1', 'password');
    const decoded = await jwt.verify(result.token, 'secret');
    assert(id == decoded.userId);
    assert(result.err == null);
  });

  it('Adds cars to user cars in DB', async function () {  
    const carIds = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
    const c = await userRepo.addCars(id, carIds);
    assert(c.user.cars[0].toString() == carIds[0].toString());
    assert(c.err == null);
    carId = carIds[0];
  });

  it('changes photo of user in DB', async function () {  
    const photo = 'changed'
    const c = await userRepo.changePhoto(id, photo);
    assert(c.user.photo == photo);
    assert(c.err == null);
  });

  it('Deletes car from user cars in DB', async function () {
    const d = await userRepo.deleteCar(id, carId);
    assert(d.user.cars.length == 1);
    assert(d.err == null);
  });
  
  it('changes email of user in DB', async function () {  
    const email = 'changed'
    const c = await userRepo.changeEmail(id, email);
    assert(c.user.email == email);
    assert(c.err == null);
  });

  it('changes mobile of user in DB', async function () {  
    const mobile = 'changed'
    const c = await userRepo.changeMobile(id, mobile);
    assert(c.user.mobile == mobile);
    assert(c.err == null);
  });

  it('changes gov of user in DB', async function () {  
    const gov = 'changed'
    const c = await userRepo.changeGov(id, gov);
    assert(c.user.gov == gov);
    assert(c.err == null);
  });

  it('changes display name of user in DB', async function () {  
    const name = 'changed'
    const c = await userRepo.changeName(id, name);
    assert(c.user.name == name);
    assert(c.err == null);
  });

  it('changes zone of user in DB', async function () {  
    const zone = 'changed'
    const c = await userRepo.changeZone(id, zone);
    assert(c.user.zone == zone);
    assert(c.err == null);
  });
  
  it('Deletes user from DB', async function () {
    const r = await userRepo.deleteUser(id);
    const u = await userRepo.findUser(id);
    assert(u.user == null);
    assert(r.err == null);
  });
});

