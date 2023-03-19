import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.scss";

export const Reserve = ({ setOpenRoom, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomNum, setNum] = useState([]);
  const { data, loading, error } = useFetch(
    `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/hotels/room/${hotelId}`
  );
  const { date } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const temp = e.target.value.split(",");
    const value = temp[0];
    const num = temp[1];
    console.log(num);
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );

    setNum(
      checked ? [...roomNum, num] : roomNum.filter((item) => item !== num)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      await axios.post(
        `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/booking`,
        {
          user: user._id,
          room: roomNum,
          hotel: hotelId,
        }
      );
      setOpenRoom(false);
      navigate("/booking");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <Close className="rClose" onClick={() => setOpenRoom(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={[roomNumber._id, roomNumber.number]}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};
