import Express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controller/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = Express.Router();

router.post("/:hotelId", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability);

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getRooms);

export default router;
