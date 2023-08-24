import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username required!"],
      min: [3, "Minimum 3 characters required!"],
      max: [12, "Minimum 12 characters allowed!"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "E-mail already used!"],
      required: [true, "E-mail required!"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "E-mail validation failed!",
      ],
    },
    password: {
      type: String,
      required: [true, "Password required!"],
      min: [8, "Minimum 8 characters required!"],
      max: [16, "Maximum 16 characters allowed!"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    profilePicture: {
      type: String,
      default: "https://vectorified.com/images/unknown-avatar-icon-7.jpg",
    },
    about: {
      type: String,
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    followings: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    pendingFollowerRequests: [{ type: mongoose.Types.ObjectId, ref: "User" }],

    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],

    blocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
