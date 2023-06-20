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

const getPostById = async (req, res) => {
  const { userId } = req.params;

  const getPostById = await postService.getPostById(userId);
  return res.status(200).json({ data: getPostById });
};

const modifyPostById = async (req, res) => {
  const { content, userId } = req.body;
  const { postId } = req.params;

  const modifydata = await postService.modifyPostById(content, userId, postId);
  return res.status(201).json({ data: modifydata });
};

const deletePostById = async (req, res) => {
  const { postId } = req.params;

  await postService.deletePostById(postId);
  return res.status(204).json({ message: "DELETE_POST_SUCCESS" });
};

const likePostById = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await postService.likePostById(postId, userId);
  return res.status(201).json({ message: "LIKE_POST_SUCCESS" });
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  modifyPostById,
  deletePostById,
  likePostById,
};
