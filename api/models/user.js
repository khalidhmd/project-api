const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  gov: { type: String, required: true },
  zone: { type: String, required: true },
  joined: { type: Date, default: new Date() },
  photo: String,
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "car" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
});

module.exports = mongoose.model("user", userSchema);
