import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getAllPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!posts) {
    return res.status(404).json({ message: "No posts found!" });
  }
  return res.status(200).json({ posts });
};

export const addPost = async (req, res, next) => {
  const { user, title, author, comment, img } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Failed!" });
  }

  const post = new Post({
    user,
    title,
    author,
    comment,
    img,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.save({ session });
    existingUser.posts.push(post);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, user: existingUser });
  }
  return res.status(200).json({ post });
};
export const editPost = async (req, res, next) => {
  const { title, author, comment, img } = req.body;
  const postId = req.params.id;
  let post;

  try {
    post = await Post.findByIdAndUpdate(postId, {
      title,
      author,
      comment,
      img,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(500).json({ message: "Post not found!" });
  }
  return res.status(200).json({ post });
};

export const getPostById = async (req, res, next) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }
  return res.status(200).json({ post });
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;

  let post;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Post.findByIdAndDelete(id).populate("user");
    await post.user.posts.pull(post);
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    return res.status(400).json({ message: "Post can't be deleted!" });
  }
  return res.status(200).json({ message: "Post deleted!" });
};

export const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    return console.log(err);
  }
  if (!user.posts) {
    return res.status(400).json({ message: "Posts not found! " });
  }
  return res.status(200).json(user.posts);
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked!");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const feed = async (req, res,next) => {
  try {
    const userId = await User.findById(req.params.id);
    const userPosts = userId.posts
    const followingsPosts = await Promise.all(
      userId.followings.map((following) => {
        return Post.find({ userId: following });
      })
    );
    console.log(userId);
    res.status(200).json(userPosts.concat(...followingsPosts))
    
  } catch (err) {
    res.status(500).json(err);
  }
};
