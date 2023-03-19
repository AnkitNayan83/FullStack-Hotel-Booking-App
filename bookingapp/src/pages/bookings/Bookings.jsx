import React, { useContext } from "react";
import { Booking } from "../../components/Booking/Booking";
import { Navbar } from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./bookings.scss";

export const Bookings = () => {
  const { user } = useContext(AuthContext);

  const { data, error, loading } = useFetch(
    `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/booking?id=${user._id}`
  );

  return (
    <div className="bookings">
      <Navbar />
      <div className="Bcontainer">
        <h1>Your bookings</h1>
        {loading ? (
          "Loading Please Wait..."
        ) : (
          <div className="Bwrapper">
            {data.map((item, i) => (
              <Booking
                hotelId={item.hotel}
                roomId={item.room}
                name={user.username}
                key={i}
                b_id={data[i]._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
