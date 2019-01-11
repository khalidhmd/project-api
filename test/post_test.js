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
    const a = await postRepo.createPost(post);
    assert(a.post.id == post.id);
    assert(a.err == null);
    id = a.post.id;
    userId = post.userid
  });

  it('Reads user post by post Id form DB', async function() {
    const b = await postRepo.findPost(id);
    assert(b.post.id == id);
    assert(b.err == null);
  });

  it('Reads user posts by user Id form DB', async function() {
    const b = await postRepo.getUserPosts(userId);
    assert(b.posts[0].id == id);
    assert(b.posts[0].userid.toString() == userId.toString());
    assert(b.err == null);
  });
  
  it('Adds comment to user post in DB', async function () {  
    commentId = mongoose.Types.ObjectId()
    const c = await postRepo.addComment(id, commentId);
    assert(c.post.comments[0].toString() == commentId.toString());
    assert(c.err == null);
  });

  it('Adds photo to user post in DB', async function () {  
    const photo = 'photo path'
    const c = await postRepo.addPhoto(id, photo);
    assert(c.post.photos[0] == photo);
    assert( c.err == null);
  });

  it('Deletes comment from user post in DB', async function () {
    const d = await postRepo.deleteComment(id, commentId);
    assert(d.post.comments.length == 0);
    assert(d.err == null);
  });

  it('Deletes photo from user post in DB', async function () {
    const d = await postRepo.deletePhoto(id, photo);
    assert(d.post.comments.length == 0);
    assert(d.err == null);
  });

  it('Reports user post in DB', async function() {
    const b = await postRepo.reportPost(id);
    assert(b.post.reported == true);
    assert(b.err == null);
  });

  it('Sets item as sold in DB', async function() {
    const b = await postRepo.setSold(id);
    assert(b.post.sold == true);
    assert(b.err == null);
  });
  
  it('Deletes user post from DB', async function () {
    const result = await postRepo.deletePost(id);
    const p = await postRepo.findPost(id);
    assert(p.post == null);
    assert(result.err == null);
  });
});

