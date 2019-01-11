const PostModel = require('../models/post');

const createPost = async (post) => {
  const result = {};
  try {
    result.post = await PostModel.create(post);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const findPost = async (id) => {
  const result = {};
  try {
    result.post = await PostModel.findById(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const getUserPosts = async (userId) => {
  const result = {};
  try {
    result.posts = await PostModel.find().where('userid').equals(userId);
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addComment = async (postId, commentId) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(postId, {
      $push: {comments: commentId}
    }, { new: true});
  } catch (err) {
    result.err = err;
  }
  return result;
}

const addPhoto = async (postId, photoPath) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(postId, {
      $push: {photos: photoPath}
    }, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deleteComment = async (postId, commentId) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(postId, {
      $pull: {comments: commentId}
    }, { new: true});
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deletePhoto = async (postId, photoPath) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(postId, {
      $pull: {photos: photoPath}
    }, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const reportPost = async (id) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(id, { reported: true}, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const setSold = async (id) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(id, { sold: true}, { new: true });
  } catch (err) {
    result.err = err;
  }
  return result;
}

const deletePost = async (id) => {
  const result = {};
  try {
    await PostModel.findByIdAndRemove(id);
  } catch (err) {
    result.err = err;
  }
  return result;
}

module.exports.createPost = createPost;
module.exports.findPost = findPost;
module.exports.addComment = addComment;
module.exports.addPhoto = addPhoto;
module.exports.deleteComment = deleteComment;
module.exports.deletePost = deletePost;
module.exports.deletePhoto = deletePhoto;
module.exports.reportPost = reportPost;
module.exports.setSold = setSold;
module.exports.getUserPosts = getUserPosts;