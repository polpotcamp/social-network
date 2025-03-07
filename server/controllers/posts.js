import User from "../models/user.js";
import Post from "../models/post.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createPost = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "Изображение не было загружено." });
      }
    const { title, text } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    let fileName = Date.now().toString() + req.files.image.name;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
    const newPost = new Post({
      username: user.username,
      title,
      text,
      imgUrl: fileName,
      author: userId,
    });

    await newPost.save();
    await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost },
    });

    return res.json(newPost);
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    if (!posts) {
      return res.json({ message: "Постов нет" });
    }

    res.json(posts);
  } catch (error) {
    return next(err);
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json(post);
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};
export const getUserPostsById = async (req, res) => {
  try {
    let userId = req.params.id;
    userId = userId.replace(":", "");
    const user = await User.findById(userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({ message: "Что-то пошло не так." });
  }
};
