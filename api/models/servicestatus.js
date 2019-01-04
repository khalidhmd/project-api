const mongoose = require('mongoose');

const servicestatusSchema = new mongoose.Schema({
  name: String, 
  date: {type: Date, default: Date.now()},
  nextkm: {type: Number, required: true},
  nextdate: {type: Date, default: Date.now()}
});

module.exports.ServicestatusModel = mongoose.model('servicestatus', servicestatusSchema);
module.exports.servicestatusSchema = servicestatusSchema