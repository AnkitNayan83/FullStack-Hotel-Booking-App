import Express from "express";
import { booking, cancelBooking, getBookings } from "../controller/booking.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = Express.Router();

router.post("/", booking);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);

export default router;
