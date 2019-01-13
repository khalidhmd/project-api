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
    const result = await userRepo.createUser(user);
    assert(result.user.id == user.id);
    assert(await bcrypt.compare('password', result.user.password));
    assert(result.err === null);
    id = result.user.id;
  });

  it('Reads user by Id form DB', async function() {
    const result = await userRepo.findUser(id);
    assert(result.user.id === id);
    assert(result.err === null);
  });

  it('Signs user in by email', async function () {
    const result = await userRepo.signinByEmail('email 1', 'password');
    const decoded = await jwt.verify(result.token, 'secret');
    assert(id === decoded.userId);
    assert(result.err === null);
  });

  it('Signs user in by mobile', async function () {
    const result = await userRepo.signinByMobile('mobile 1', 'password');
    const decoded = await jwt.verify(result.token, 'secret');
    assert(id === decoded.userId);
    assert(result.err === null);
  });

  it('Adds cars to user cars in DB', async function () {  
    const carIds = [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
    const result = await userRepo.addCars(id, carIds);
    assert(result.user.cars[0].toString() === carIds[0].toString());
    assert(result.err === null);
    carId = carIds[0];
  });

  it('changes photo of user in DB', async function () {  
    const photo = 'changed'
    const result = await userRepo.changePhoto(id, photo);
    assert(result.user.photo === photo);
    assert(result.err === null);
  });

  it('Deletes car from user cars in DB', async function () {
    const result = await userRepo.deleteCar(id, carId);
    assert(result.user.cars.length === 1);
    assert(result.err === null);
  });
  
  it('changes email of user in DB', async function () {  
    const email = 'changed'
    const result = await userRepo.changeEmail(id, email);
    assert(result.user.email === email);
    assert(result.err === null);
  });

  it('changes mobile of user in DB', async function () {  
    const mobile = 'changed'
    const result = await userRepo.changeMobile(id, mobile);
    assert(result.user.mobile === mobile);
    assert(result.err === null);
  });

  it('changes gov of user in DB', async function () {  
    const gov = 'changed'
    const result = await userRepo.changeGov(id, gov);
    assert(result.user.gov === gov);
    assert(result.err === null);
  });

  it('changes display name of user in DB', async function () {  
    const name = 'changed'
    const result = await userRepo.changeName(id, name);
    assert(result.user.name === name);
    assert(result.err === null);
  });

  it('changes zone of user in DB', async function () {  
    const zone = 'changed'
    const result = await userRepo.changeZone(id, zone);
    assert(result.user.zone === zone);
    assert(result.err === null);
  });
  
  it('Deletes user from DB', async function () {
    const result = await userRepo.deleteUser(id);
    const result1 = await userRepo.findUser(id);
    assert(result1.user === null);
    assert(result.err === null);
  });
});

