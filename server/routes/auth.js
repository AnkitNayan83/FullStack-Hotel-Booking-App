import Express from "express";
import { loginUser, userRegister } from "../controller/auth.js";

const router = Express.Router();

router.post("/register", userRegister);
router.post("/login", loginUser);

export default router;
