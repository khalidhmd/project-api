const assert = require('assert');
const PostModel = require('../api/models/post');
var postRepo = require('../api/repo/postRepo');
const mongoose = require('mongoose');

describe('Testing post Repo repo', function() {
  let id;
  let userId;
  let commentId;
  let photo;

  before (async function () {
    await PostModel.deleteMany();
  });

  it('Saves user post to DB', async function() {
    const post = new PostModel({
      make:'Hundai',
      model: 'Verna',
      category: 'post',
      title: 'test post',
      body: 'test post details',
      userid: mongoose.Types.ObjectId()
    });
    a = await postRepo.createPost(post);
    assert(a.id == post.id);
    id = a.id;
    userId = post.userid
  });

  it('Reads user post by post Id form DB', async function() {
    const b = await postRepo.findPost(id);
    assert(b.id == id);
  });

  it('Reads user posts by user Id form DB', async function() {
    const b = await postRepo.getUserPosts(userId);
    assert(b[0].id == id);
    assert(b[0].userid.toString() == userId.toString());
  });
  
  it('Adds comment to user post in DB', async function () {  
    commentId = mongoose.Types.ObjectId()
    const c = await postRepo.addComment(id, commentId);
    assert(c.comments[0].toString() == commentId.toString());
  });

  it('Adds photo to user post in DB', async function () {  
    const photo = 'photo path'
    const c = await postRepo.addPhoto(id, photo);
    assert(c.photos[0] == photo);
  });

  it('Deletes comment from user post in DB', async function () {
    const d = await postRepo.deleteComment(id, commentId);
    assert(d.comments.length == 0);
  });

  it('Deletes photo from user post in DB', async function () {
    const d = await postRepo.deletePhoto(id, photo);
    assert(d.comments.length == 0);
  });

  it('Reports user post in DB', async function() {
    const b = await postRepo.reportPost(id);
    assert(b.reported == true);
  });

  it('Sets item as sold in DB', async function() {
    const b = await postRepo.setSold(id);
    assert(b.sold == true);
  });
  
  it('Deletes user post from DB', async function () {
    await postRepo.deletePost(id);
    const post = await postRepo.findPost(id);
    assert(post == null);
  });
});

