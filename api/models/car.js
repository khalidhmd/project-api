const mongoose = require('mongoose');
const servicestatus = require('./servicestatus');
const servicedefault = require('./servicedefalt');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: Number,
    required: true
  },
  km: {
    type: Number,
    default: 0
  },
  notes: String,
  modelyear: Number,
  photos: [String],
  servicedefaults: [servicedefault],
  servicestatuses: [servicestatus]
});

module.exports = mongoose.model('car', carSchema);