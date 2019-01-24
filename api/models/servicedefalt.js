const mongoose = require("mongoose");

const servicedefaultSchema = new mongoose.Schema({
  name: String,
  km: { type: Number, default: 10 },
  months: { type: Number, default: 12 }
});

module.exports.DefaultModel = mongoose.model(
  "servicedefault",
  servicedefaultSchema
);
module.exports.servicedefaultSchema = servicedefaultSchema;
