import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ message: "Success!", user });
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  let user;

  try {
    user = await User.findOne({ username });
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const isPwdCorrect = bcrypt.compareSync(password, user.password);

  if (!isPwdCorrect) {
    return res.status(400).json({ message: "Incorrect password!" });
  }
  return res
    .status(200)
    .json({ message: "Login successful!", user });
};
