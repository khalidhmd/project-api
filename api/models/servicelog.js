const mongoose = require('mongoose');

const servicelogSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  prevdate: {
    type: Date,
    required: true
  },
  partprice: Number,
  serviceprice: Number,
  notes: String,
  car: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('servicelog', servicelogSchema);