const mongoose = require('mongoose');

const servicedefaultSchema = new mongoose.Schema({
  service: {
    km: Number,
    months: Number
  }
});

module.exports = mongoose.model('servicedefault', servicedefaultSchema);