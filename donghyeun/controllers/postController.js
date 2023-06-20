const postService = require("../services/postService");

const createPost = async (req, res) => {
  const { userId, title, content, imageUrl } = req.body;
  await postService.createPost(userId, title, content, imageUrl);
  return res.status(201).json({ message: "UPLOAD_POST_SUCCESS" });
};

const getAllPost = async (req, res) => {
  const viewAllPost = await postService.getAllPost();
  return res.status(200).json({ data: viewAllPost });
};

const getUserPost = async (req, res) => {
  const { userId } = req.params;

  const viewUserPost = await postService.getUserPost(userId);
  return res.status(200).json({ data: viewUserPost });
};

const modifyPost = async (req, res) => {
  const { content, userId } = req.body;
  const { postId } = req.params;

  const modifydata = await postService.modifyPost(content, userId, postId);
  return res.status(201).json({ data: modifydata });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  await postService.deletePost(postId);
  return res.status(204).json({ message: "DELETE_POST_SUCCESS" });
};

const likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await postService.likePost(postId, userId);
  return res.status(201).json({ message: "LIKE_POST_SUCCESS" });
};

module.exports = {
  createPost,
  getAllPost,
  getUserPost,
  modifyPost,
  deletePost,
  likePost,
};
