const mongoose = require('mongoose');

const servicestatusSchema = new mongoose.Schema({
  name: String, 
  date: {type: Date, default: new Date()},
  nextkm: {type: Number, required: true},
  nextdate: {type: Date, default: new Date()}
});

module.exports.ServicestatusModel = mongoose.model('servicestatus', servicestatusSchema);
module.exports.servicestatusSchema = servicestatusSchema