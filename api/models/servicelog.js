const mongoose = require('mongoose');

const servicelogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  prevdate: { type: Date, default: Date.now() },
  partprice: Number,
  serviceprice: Number,
  notes: String,
  carid: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('servicelog', servicelogSchema);