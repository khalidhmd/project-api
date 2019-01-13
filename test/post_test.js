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
    const result = await postRepo.createPost(post);
    assert(result.post.id === post.id);
    assert(result.err === null);
    id = result.post.id;
    userId = post.userid
  });

  it('Reads user post by post Id form DB', async function() {
    const result = await postRepo.findPost(id);
    assert(result.post.id === id);
    assert(result.err === null);
  });

  it('Reads user posts by user Id form DB', async function() {
    const result = await postRepo.getUserPosts(userId);
    assert(result.posts[0].id === id);
    assert(result.posts[0].userid.toString() === userId.toString());
    assert(result.err === null);
  });
  
  it('Adds comment to user post in DB', async function () {  
    commentId = mongoose.Types.ObjectId()
    const result = await postRepo.addComment(id, commentId);
    assert(result.post.comments[0].toString() === commentId.toString());
    assert(result.err === null);
  });

  it('Adds photo to user post in DB', async function () {  
    const photo = 'photo path'
    const result = await postRepo.addPhoto(id, photo);
    assert(result.post.photos[0] === photo);
    assert( result.err === null);
  });

  it('Deletes comment from user post in DB', async function () {
    const result = await postRepo.deleteComment(id, commentId);
    assert(result.post.comments.length === 0);
    assert(result.err === null);
  });

  it('Deletes photo from user post in DB', async function () {
    const result = await postRepo.deletePhoto(id, photo);
    assert(result.post.comments.length === 0);
    assert(result.err === null);
  });

  it('Reports user post in DB', async function() {
    const result = await postRepo.reportPost(id);
    assert(result.post.reported === true);
    assert(result.err === null);
  });

  it('Sets item as sold in DB', async function() {
    const result = await postRepo.setSold(id);
    assert(result.post.sold === true);
    assert(result.err === null);
  });
  
  it('Deletes user post from DB', async function () {
    const result = await postRepo.deletePost(id);
    const result1 = await postRepo.findPost(id);
    assert(result1.post === null);
    assert(result.err === null);
  });
});

