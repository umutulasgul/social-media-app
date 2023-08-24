import express from "express";
import {
  getAllUsers,
  getUserByUsername,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByUsername);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);

export default router;
