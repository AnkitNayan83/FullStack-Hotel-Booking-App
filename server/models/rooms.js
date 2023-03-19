import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: [String],
    required: true,
  },
  // multiple rooms of same type, so to differentiate them we need room number
  roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
});

export default mongoose.model("Room", roomSchema);
