const mongoose = require('mongoose');
const userModel = require('./user');
const commentModel = require('./comment');

const postSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: Number, required: true },
  category : { required: true, enum: ['post', 'question', 'help', 'post'] },
  sold: Boolean,
  title: { type: String, required: true },
  modelyear: Number,
  photos: [String],
  body: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: commentModel.modelName }],
  price: Number,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: userModel.modelName }
});

module.exports = mongoose.model('post', postSchema);