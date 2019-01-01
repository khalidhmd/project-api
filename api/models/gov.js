const mongoose = require('mongoose');

const govSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  zones: [String]
});

module.exports = mongoose.model('gov', govSchema);