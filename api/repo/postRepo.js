const PostModel = require("../models/post");
const userRepo = require("./userRepo");

module.exports.createPost = async (post, userId) => {
  const result = {};
  try {
    result.post = await PostModel.create(post);
    const { user } = await userRepo.addPost(userId, result.post.id);
    result.userPosts = user.posts;
    result.err = null;
  } catch (err) {
    if (result.post) await PostModel.findByIdAndDelete(result.post.id);
    if (result.userPosts) await userRepo.deletePost(user.id, result.post.id);
    result.err = err;
  }
  return result;
};

module.exports.findPost = async id => {
  const result = {};
  try {
    result.post = await PostModel.findById(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.getUserPosts = async userId => {
  const result = {};
  try {
    result.posts = await PostModel.find()
      .where("userid")
      .equals(userId);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addComment = async (postId, commentId) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: commentId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.addPhoto = async (postId, photoPath) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { photos: photoPath }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deleteComment = async (postId, commentId) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: commentId }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deletePhoto = async (postId, photoPath) => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { photos: photoPath }
      },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.reportPost = async id => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
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

module.exports.setSold = async id => {
  const result = {};
  try {
    result.post = await PostModel.findByIdAndUpdate(
      id,
      { sold: true },
      { new: true }
    );
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports.deletePost = async id => {
  const result = {};
  try {
    await PostModel.findByIdAndRemove(id);
    result.err = null;
  } catch (err) {
    result.err = err;
  }
  return result;
};
