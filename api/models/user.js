const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  hashpassword: { type: String, required: true },
  salt: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  gov: { type: String, required: true },
  zone: { type: String, required: true },
  joined: { type: Date, default: Date.now()},
  photo: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car' }]
});

module.exports = mongoose.model('user', userSchema);