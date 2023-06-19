const postDao = require("../models/postDao");

const createPosts = async (title, content, userId) => {
  return await postDao.createPosts(title, content, userId);
};

const getPosts = async () => {
  return await postDao.getPosts();
};

const modifyPosts = async (title, content, postId) => {
  return await postDao.modifyPosts(title, content, postId);
};

const deletePosts = async (postId) => {
  return await postDao.deletePosts(postId);
};

const postsLikes = async (userId, postId) => {
  return await postDao.postsLikes(userId, postId);
};

module.exports = {
  createPosts,
  getPosts,
  modifyPosts,
  deletePosts,
  postsLikes,
};
