import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(201).send("User Registered");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // {username:username}
    if (!user) return next(createError(404, "Wrong username or password"));

    const pass_check = await bcrypt.compare(req.body.password, user.password);

    if (!pass_check)
      return next(createError(400, "Wrong username or password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...others } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true }) // to make more secure
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};
