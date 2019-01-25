const CommentModel = require("../models/comment");

module.exports.createComment = async comment => {
  const result = {};
  try {
    result.comment = await CommentModel.create(comment);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.getUserComments = async userId => {
  const result = {};
  try {
    result.comments = await CommentModel.find()
      .where("userid")
      .equals(userId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.getPostComments = async postId => {
  const result = {};
  try {
    result.comments = await CommentModel.find()
      .where("postid")
      .equals(postId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.reportComment = async id => {
  const result = {};
  try {
    result.comment = await CommentModel.findByIdAndUpdate(
      id,
      { reported: true },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.getComment = async id => {
  const result = {};
  try {
    result.comment = await CommentModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteComment = async id => {
  const result = {};
  try {
    await CommentModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
