import auth from "../middlewares/auth.js";
import express from "express";
const router = express.Router();
import {
  createPost,
  getAllPosts,
  getPostById,
  getUserPostsById,
} from "../controllers/posts.js";
router.post("/posts", auth, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.get("/posts/user/:id", getUserPostsById);
export default router;
