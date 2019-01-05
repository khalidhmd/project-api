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
    const a = await commentRepo.saveComment(comment);
    assert(a.id == comment.id);
    id = a.id;
    userid = comment.userid;
    postid = comment.postid;
  });

  it('Reads user comments form DB', async function() {
    const b = await commentRepo.getUserComments(userid);
    assert(b[0].id == id);
  });

  it('Reads post comments form DB', async function() {
    const b = await commentRepo.getPostComments(postid);
    assert(b[0].id == id);
  });

  it('Reports comments in DB', async function() {
    const b = await commentRepo.reportComment(id);
    assert(b.reported == true);
  });

  it('Deletes service log from DB', async function () {
    await commentRepo.deleteComment(id);
    const comment = await commentRepo.getComment(id);
    assert(comment == null);
  });
});
