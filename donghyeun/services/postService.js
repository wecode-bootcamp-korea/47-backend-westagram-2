const postDao = require("../models/postDao");

const Upload = async (userId, title, content, imageUrl) => {
  const createPost = await postDao.createPost(userId, title, content, imageUrl);
  return createPost;
};

const All = async () => {
  const AllPostResult = await postDao.viewAllPost();
  return AllPostResult;
};

const User = async () => {
  const UserPostResult = await postDao.viewUserPost();
  return UserPostResult;
};

const Modify = async (content, userId, postId) => {
  const ModifyPostResult = await postDao.ModifyPost(content, userId, postId);
  return ModifyPostResult;
};

const Delete = async (postId) => {
  const DeletePostResult = await postDao.DeletePost(postId);
  return DeletePostResult;
};

const Like = async (postId, userId) => {
  const LikePostResult = await postDao.LikePost(postId, userId);
  return LikePostResult;
};

module.exports = { Upload, All, User, Modify, Delete, Like };
