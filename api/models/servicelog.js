const mongoose = require("mongoose");

const servicelogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: new Date() },
  km: { type: Number, required: true },
  partprice: { type: Number, default: 1 },
  serviceprice: { type: Number, default: 1 },
  notes: String,
  carid: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model("servicelog", servicelogSchema);
