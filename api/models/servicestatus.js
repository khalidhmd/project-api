const mongoose = require("mongoose");

const servicestatusSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: new Date() },
  nextkm: { type: Number },
  nextdate: { type: Date, default: new Date() }
});

module.exports.StatusModel = mongoose.model(
  "servicestatus",
  servicestatusSchema
);
module.exports.servicestatusSchema = servicestatusSchema;
