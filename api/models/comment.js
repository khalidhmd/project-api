const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: new Date() },
  reported: { type: Boolean, default: false },
  userid: { type: mongoose.Schema.Types.ObjectId, required: true },
  postid: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('comment', commentSchema);