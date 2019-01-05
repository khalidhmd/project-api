const PostModel = require('../models/post');

const savePost = async (post) => {
  const result = await PostModel.create(post);
  return result;
}

const findPost = async (id) => {
  const result = await PostModel.findById(id);
  return result;
}

const getUserPosts = async (userId) => {
  const result = await PostModel.find().where('userid').equals(userId);
  return result;
}

const addComment = async (post, commentId) => {
  post.comments.push(commentId);
  const result = await post.save();
  return result;
}

const addPhoto = async (post, photoPath) => {
  post.photos.push(photoPath);
  const result = await post.save();
  return result;
}

const deleteComment = async (postId, commentId) => {
  const post = await PostModel.findById(postId)
  let comments = post.comments.filter( obj => obj.toString() != commentId.toString());
  post.comments = comments;
  const result = await post.save();
  return result;
}

const deletePhoto = async (postId, photoPath) => {
  const post = await PostModel.findById(postId)
  let photos = post.photos.filter( obj => obj != photoPath);
  post.photos = photos;
  const result = await post.save();
  return result;
}

const reportPost = async (id) => {
  const result = await PostModel.findByIdAndUpdate(id, { reported: true}, { new: true });
  return result;
}

const setSold = async (id) => {
  const result = await PostModel.findByIdAndUpdate(id, { sold: true}, { new: true });
  return result;
}

const deletePost = async (id) => {
  await PostModel.findByIdAndRemove(id);
}

module.exports.savePost = savePost;
module.exports.findPost = findPost;
module.exports.addComment = addComment;
module.exports.addPhoto = addPhoto;
module.exports.deleteComment = deleteComment;
module.exports.deletePost = deletePost;
module.exports.deletePhoto = deletePhoto;
module.exports.reportPost = reportPost;
module.exports.setSold = setSold;
module.exports.getUserPosts = getUserPosts;