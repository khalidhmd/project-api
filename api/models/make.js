const mongoose = require('mongoose');
const { modelSchema } = require('./model');

const makeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true },
  models: [modelSchema]
});

module.exports = mongoose.model('make', makeSchema);