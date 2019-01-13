const CommentModel = require('../models/comment');

const createComment = async (comment) => {
  const result = {};
  try {
    result.comment = await CommentModel.create(comment);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const getUserComments = async (userId) => {
  const result = {};
  try {
    result.comments = await CommentModel.find().where('userid').equals(userId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const getPostComments = async (postId) => {
  const result = {};
  try {
    result.comments = await CommentModel.find().where('postid').equals(postId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const reportComment = async (id) => {
  const result = {};
  try {
    result.comment = await CommentModel.findByIdAndUpdate(id, { reported: true}, { new: true });
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const getComment = async (id) => {
  const result = {};
  try {
    result.comment = await CommentModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteComment = async (id) => {
  const result = {};
  try {
    await CommentModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
}


module.exports.createComment = createComment;
module.exports.getUserComments = getUserComments;
module.exports.getPostComments = getPostComments;
module.exports.deleteComment = deleteComment;
module.exports.reportComment = reportComment;
module.exports.getComment = getComment;