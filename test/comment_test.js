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
    const a = await commentRepo.createComment(comment);
    assert(a.comment.id == comment.id);
    assert(a.err == null);
    id = a.comment.id;
    userid = comment.userid;
    postid = comment.postid;
  });

  it('Reads user comments form DB', async function() {
    const b = await commentRepo.getUserComments(userid);
    assert(b.comments[0].id == id);
    assert(b.err == null);
  });

  it('Reads post comments form DB', async function() {
    const b = await commentRepo.getPostComments(postid);
    assert(b.comments[0].id == id);
    assert(b.err == null);
  });

  it('Reports comments in DB', async function() {
    const b = await commentRepo.reportComment(id);
    assert(b.comment.reported == true);
    assert(b.err == null);
  });

  it('Deletes comment from DB', async function () {
    await commentRepo.deleteComment(id);
    const d = await commentRepo.getComment(id);
    assert(d.comment == null);
    assert(d.err == null);
  });
});
