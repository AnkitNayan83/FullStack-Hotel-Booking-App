import User from "../models/user.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await User.findById(id)))
      return next(createError(404, "No User with this id exists"));
    else {
      await User.findByIdAndDelete(id);
      res.status(200).json("User Deleted");
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(createError(404, "No User Found"));
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    return next(createError(404, "No User Found"));
  }
};
