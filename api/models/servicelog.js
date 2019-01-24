const mongoose = require('mongoose');

const servicelogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: new Date() },
  prevdate: { type: Date, default: new Date() },
  partprice: Number,
  serviceprice: Number,
  notes: String,
  carid: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('servicelog', servicelogSchema);