import Express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controller/hotel.js";

const router = Express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getHotel); //added find to prevent express to think that its an id

//GET All
router.get("/", getAllHotels);

// sorting hotels
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
