const assert = require("chai").assert;
const PostModel = require("../api/models/post");
var postRepo = require("../api/repo/postRepo");
const mongoose = require("mongoose");
const userRepo = require("../api/repo/userRepo");

describe("Testing post Repo repo", function() {
  let id;
  let userId;
  let commentId;
  let photo;

  before(async function() {
    await PostModel.deleteMany();
    const { user } = await userRepo.createUser({
      name: "user 2",
      password: "password",
      email: "email 2",
      mobile: "mobile 2",
      gov: "gov 1",
      zone: "zone 1"
    });
    userId = user.id;
  });

  it("Saves user post to DB", async function() {
    const post = new PostModel({
      make: "Hundai",
      model: "Verna",
      category: "post",
      title: "test post",
      body: "test post details",
      userid: userId
    });
    const result = await postRepo.createPost(post, userId);
    assert.strictEqual(result.post.id, post.id);
    assert.isNull(result.err);
    assert.lengthOf(result.userPosts, 1);
    id = result.post.id;
  });

  it("Reads user post by post Id form DB", async function() {
    const result = await postRepo.findPost(id);
    assert.strictEqual(result.post.id, id);
    assert.isNull(result.err);
  });

  it("Reads user posts by user Id form DB", async function() {
    const result = await postRepo.getUserPosts(userId);
    assert.strictEqual(result.posts[0].id, id);
    assert.strictEqual(result.posts[0].userid.toString(), userId.toString());
    assert.isNull(result.err);
  });

  it("Adds comment to user post in DB", async function() {
    commentId = mongoose.Types.ObjectId();
    const result = await postRepo.addComment(id, commentId);
    assert.strictEqual(
      result.post.comments[0].toString(),
      commentId.toString()
    );
    assert.isNull(result.err);
  });

  it("Adds photo to user post in DB", async function() {
    const photo = "photo path";
    const result = await postRepo.addPhoto(id, photo);
    assert.strictEqual(result.post.photos[0], photo);
    assert.isNull(result.err);
  });

  it("Deletes comment from user post in DB", async function() {
    const result = await postRepo.deleteComment(id, commentId);
    assert.strictEqual(result.post.comments.length, 0);
    assert.isNull(result.err);
  });

  it("Deletes photo from user post in DB", async function() {
    const result = await postRepo.deletePhoto(id, photo);
    assert.strictEqual(result.post.comments.length, 0);
    assert.isNull(result.err);
  });

  it("Reports user post in DB", async function() {
    const result = await postRepo.reportPost(id);
    assert.isTrue(result.post.reported);
    assert.isNull(result.err);
  });

  it("Sets item as sold in DB", async function() {
    const result = await postRepo.setSold(id);
    assert.isTrue(result.post.sold);
    assert.isNull(result.err);
  });

  it("Deletes user post from DB", async function() {
    const result = await postRepo.deletePost(id);
    const result1 = await postRepo.findPost(id);
    assert.isNull(result1.post);
    assert.isNull(result.err);
  });
});
