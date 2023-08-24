import express from "express";
import {
  getAllPosts,
  addPost,
  editPost,
  getPostById,
  deletePost,
  getPostsByUserId,
  likePost,
  feed,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/add", addPost);
router.put("/edit/:id", editPost);
router.delete("/:id", deletePost);
router.get("/user/:id", getPostsByUserId);
router.get("/like/:id", likePost);
router.get("/feed/:id", feed);


export default router;
