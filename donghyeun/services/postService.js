const postDao = require("../models/postDao");

const Upload = async (userId, title, content, imageUrl) => {
  const createPost = await postDao.createPost(userId, title, content, imageUrl);
  return createPost;
};

const All = async () => {
  const AllPost = await postDao.viewAllPost();
  return AllPost;
};

const User = async (userId) => {
  const UserPost = await postDao.viewUserPost(userId);
  return UserPost;
};

const Modify = async (content, userId, postId) => {
  const ModifyPost = await postDao.ModifyPost(content, userId, postId);
  return ModifyPost;
};

const Delete = async (postId) => {
  const DeletePost = await postDao.DeletePost(postId);
  return DeletePost;
};

const Like = async (postId, userId) => {
  const LikePost = await postDao.LikePost(postId, userId);
  return LikePost;
};

module.exports = { Upload, All, User, Modify, Delete, Like };
