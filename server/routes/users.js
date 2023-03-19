import Express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controller/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = Express.Router();

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET All
router.get("/", verifyAdmin, getAllUsers);

export default router;
