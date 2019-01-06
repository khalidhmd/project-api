const CommentModel = require('../models/comment');

const createComment = async (comment) => {
  const result = await CommentModel.create(comment);
  return result;
}

const getUserComments = async (userId) => {
  const result = await CommentModel.find().where('userid').equals(userId);
  return result;
}

const getPostComments = async (postId) => {
  const result = await CommentModel.find().where('postid').equals(postId);
  return result;
}

const reportComment = async (id) => {
  const result = await CommentModel.findByIdAndUpdate(id, { reported: true}, { new: true });
  return result;
}

const getComment = async (id) => {
  const result = await CommentModel.findById(id);
  return result;
}

const deleteComment = async (id) => {
  await CommentModel.findByIdAndRemove(id);
}


module.exports.createComment = createComment;
module.exports.getUserComments = getUserComments;
module.exports.getPostComments = getPostComments;
module.exports.deleteComment = deleteComment;
module.exports.reportComment = reportComment;
module.exports.getComment = getComment;