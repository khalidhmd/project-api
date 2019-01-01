const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('part', partSchema);