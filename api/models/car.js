const mongoose = require('mongoose');
const {servicestatusSchema} = require('./servicestatus');
const {servicedefaultSchema} = require('./servicedefalt');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  km: { type: Number, default: 0 },
  notes: String,
  modelyear: Number,
  photos: [String],
  servicedefaults: [servicedefaultSchema],
  servicestatuses: [servicestatusSchema]
});

module.exports = mongoose.model('car', carSchema);