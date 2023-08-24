import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User not found!"],
    },
    title: {
      type: String,
      required: [true, "Please enter the title!"],
    },
    author: {
      type: String,
      required: [true, "Please enter the author!"],
    },
    comment: {
      type: String,
      max: 250,
    },
    img: {
      type: String,
      default:
        "https://code-artisan.io/wp-content/uploads/2020/12/default_book_cover_2015.jpg",
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
