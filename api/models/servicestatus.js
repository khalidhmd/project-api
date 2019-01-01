const mongoose = require('mongoose');

const servicestatusSchema = new mongoose.Schema({
  service: {
    date: Date,
    nextkm: Number,
    nextdate: Date
  }
});

module.exports = mongoose.model('servicestatus', servicestatusSchema);