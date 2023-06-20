const postDao = require("../models/postDao");

const createPost = async (userId, title, content, imageUrl) => {
  return await postDao.createPost(userId, title, content, imageUrl);
};

const getAllPost = async () => {
  return await postDao.getAllPost();
};

const getUserPost = async (userId) => {
  return await postDao.getUserPost(userId);
};

const modifyPost = async (content, userId, postId) => {
  return await postDao.ModifyPost(content, userId, postId);
};

const deletePost = async (postId) => {
  return await postDao.DeletePost(postId);
};

const likePost = async (postId, userId) => {
  return await postDao.LikePost(postId, userId);
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
  modifyPost,
  deletePost,
  likePost,
};
