const assert = require("chai").assert;
const CommentModel = require("../api/models/comment");
const commentRepo = require("../api/repo/commentRepo");
const userRepo = require("../api/repo/userRepo");
const postRepo = require("../api/repo/postRepo");
const UserModel = require("../api/models/user");

describe("Testing comment Repo", function() {
  this.timeout(5000);
  let id;
  let userid;
  let postid;

  before(async function() {
    await CommentModel.deleteMany();
    await UserModel.deleteMany();
    const { user } = await userRepo.createUser({
      name: "user 1",
      password: "password",
      email: "email 1",
      mobile: "mobile 1",
      gov: "gov 1",
      zone: "zone 1"
    });
    userid = user.id;
    const { post } = await postRepo.createPost(
      {
        make: "Hundai",
        model: "Verna",
        category: "post",
        title: "test post",
        body: "test post details",
        userid: userid
      },
      userid
    );
    postid = post.id;
  });

  it("Saves comment to DB", async function() {
    const comment = new CommentModel({
      text: "تغيير زيت",
      postid: postid,
      userid: userid
    });
    const result = await commentRepo.createComment(comment);
    const { post } = await postRepo.findPost(postid);
    const { user } = await userRepo.findUser(userid);
    assert.strictEqual(result.comment.id, comment.id);
    assert.include(user.posts, result.comment.postid);
    assert.include(post.comments, result.comment.id);
    assert.include(result.postComments, result.comment.id);
    assert.include(result.userPosts, result.comment.postid);
    assert.isNull(result.err);
    id = result.comment.id;
  });

  it("Reads user comments form DB", async function() {
    const result = await commentRepo.getUserComments(userid);
    assert.strictEqual(result.comments[0].id, id);
    assert.isNull(result.err);
  });

  it("Reads post comments form DB", async function() {
    const result = await commentRepo.getPostComments(postid);
    assert(result.comments[0].id, id);
    assert.isNull(result.err);
  });

  it("Reports comments in DB", async function() {
    const result = await commentRepo.reportComment(id);
    assert.strictEqual(result.comment.reported, true);
    assert.isNull(result.err);
  });

  it("Deletes comment from DB", async function() {
    await commentRepo.deleteComment(id, postid);
    const result = await commentRepo.getComment(id);
    const { post } = await postRepo.findPost(postid);
    assert.notInclude(post.comments, id);
    assert.isNull(result.comment);
    assert.isNull(result.err);
  });
});
