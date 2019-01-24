const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  category : { type: String, required: true, enum: ['post', 'question', 'help', 'usedpart'] },
  sold: Boolean,
  reported: { type: Boolean, default: false},
  title: { type: String, required: true },
  modelyear: Number,
  photos: [String],
  body: { type: String, required: true},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
  price: Number,
  date: {type: Date, default: new Date()},
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('post', postSchema);