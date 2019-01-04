const mongoose = require('mongoose');
const userModel = require('./user');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  reported: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: userModel.modelName }
});

module.exports = mongoose.model('comment', commentSchema);