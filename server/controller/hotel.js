import Hotel from "../models/hotel.js";
import Room from "../models/rooms.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  const hotel = req.body;
  const newHotel = new Hotel(hotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!(await Hotel.findById(id)))
      return next(createError(404, "No hotel with this id exists"));
    else {
      await Hotel.findByIdAndDelete(id);
      res.status(200).json("Hotel Deleted");
    }
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    next(createError(404, "No Hotel Found"));
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    const allHotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 999, $lt: max || 50000 },
    }).limit(req.query.limit || 4);
    res.status(200).json(allHotel);
  } catch (error) {
    return next(createError(404, "No Hotel Found"));
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      // using promise because of multiple promises
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villa", count: villaCount },
      { type: "Cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
