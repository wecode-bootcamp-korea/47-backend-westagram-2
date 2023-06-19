const { ModifyPost } = require("../models/postDao");
const postService = require("../services/postService");

const Upload = async (req, res) => {
  const { userId, title, content, imageUrl } = req.body;
  await postService.Upload(userId, title, content, imageUrl);
  return res.status(201).json({ message: "UPLOAD_POST_SUCCESS" });
};

const All = async (req, res) => {
  const viewAllPost = await postService.All();
  return res.status(200).json({ data: viewAllPost });
};

const User = async (req, res) => {
  const { userId } = req.params;

  const viewUserPost = await postService.User(userId);
  return res.status(200).json({ data: viewUserPost });
};

const Modify = async (req, res) => {
  const { content, userId } = req.body;
  const { postId } = req.params;

  const modifydata = await postService.Modify(content, userId, postId);
  return res.status(201).json({ data: modifydata });
};

const Delete = async (req, res) => {
  const { postId } = req.params;

  await postService.Delete(postId);
  return res.status(204).json({ message: "DELETE_POST_SUCCESS" });
};

const Like = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await postService.Like(postId, userId);
  return res.status(201).json({ message: "LIKE_POST_SUCCESS" });
};

module.exports = { Upload, All, User, Modify, Delete, Like };
