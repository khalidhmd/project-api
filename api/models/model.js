const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  photo: String
});

module.exports.ModelModel = mongoose.model('model', modelSchema);
module.exports.modelSchema = modelSchema;