const assert = require('assert');
const CommentModel = require('../api/models/comment');
const commentRepo = require('../api/repo/commentRepo');
const mongoose = require('mongoose')

describe('Testing service log Repo', function() {
  let id;
  let userid;
  let postid;

  before (async function () {
    await CommentModel.deleteMany();
  });

  it('Saves comment to DB', async function() {
    const comment = new CommentModel({
      text:'تغيير زيت', 
      postid: mongoose.Types.ObjectId(),
      userid: mongoose.Types.ObjectId()
    });
    const result = await commentRepo.createComment(comment);
    assert(result.comment.id === comment.id);
    assert(result.err === null);
    id = result.comment.id;
    userid = comment.userid;
    postid = comment.postid;
  });

  it('Reads user comments form DB', async function() {
    const result = await commentRepo.getUserComments(userid);
    assert(result.comments[0].id === id);
    assert(result.err === null);
  });

  it('Reads post comments form DB', async function() {
    const result = await commentRepo.getPostComments(postid);
    assert(result.comments[0].id === id);
    assert(result.err === null);
  });

  it('Reports comments in DB', async function() {
    const result = await commentRepo.reportComment(id);
    assert(result.comment.reported === true);
    assert(result.err === null);
  });

  it('Deletes comment from DB', async function () {
    await commentRepo.deleteComment(id);
    const result = await commentRepo.getComment(id);
    assert(result.comment === null);
    assert(result.err === null);
  });
});
