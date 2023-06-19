const postService = require("../services/postService");

const createPosts = async (req, res) => {
  const { title, content, userId } = req.body;
  
  if (!title || !content || !userId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }
  await postService.createPosts(title, content, userId);
  return res.status(201).json({ message: "Created Posts" });
};

const getPosts = async (req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json({ data: posts });
};

const modifyPosts = async (req, res) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const modify = await postService.modifyPosts(title, content, postId);
  return res.status(201).json({ data: modify });
};

const deletePosts = async (req, res) => {
  const { postId } = req.params;
  await postService.deletePosts(postId);
  return res.status(200).json({ message: "Successfully deleted" });
};

const postsLikes = async (req, res) => {
  const { userId, postId } = req.params;
  await postService.postsLikes(userId, postId);
  return res.status(201).json({ message: "likes created" });
};

module.exports = {
  createPosts,
  getPosts,
  modifyPosts,
  deletePosts,
  postsLikes,
};
