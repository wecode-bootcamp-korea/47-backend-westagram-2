const postDao = require("../models/postDao");

const createPost = async (userId, title, content, imageUrl) => {
  return await postDao.createPost(userId, title, content, imageUrl);
};

const getAllPost = async () => {
  return await postDao.getAllPost();
};

const getPostById = async (userId) => {
  return await postDao.getPostById(userId);
};

const modifyPostById = async (content, userId, postId) => {
  return await postDao.modifyPostById(content, userId, postId);
};

const deletePostById = async (postId) => {
  return await postDao.deletePostById(postId);
};

const likePostById = async (postId, userId) => {
  return await postDao.likePostById(postId, userId);
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  modifyPostById,
  deletePostById,
  likePostById,
};
