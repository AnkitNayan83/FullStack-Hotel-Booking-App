import axios from "axios";
import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./booking.scss";

export const Booking = ({ hotelId, roomId, name, b_id }) => {
  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);

  const handelClick = async () => {
    await axios.delete(
      `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/booking/${b_id}`
    );
    window.location.reload(false);
  };

  return (
    <div className="booking">
      {loading
        ? "Loading please wait"
        : data && (
            <div className="box">
              <div className="leftB">
                <img src={data.photos[0]} alt="" />
                <div className="desc">
                  <h3>{data.name}</h3>
                  <p>{data.address}</p>
                </div>
              </div>
              <div className="rightB">
                <div className="num">
                  <h4>Room Numbers:</h4>
                  <div className="rn">
                    {roomId.map((item, i) => (
                      <span key={i}>{item} </span>
                    ))}
                  </div>
                </div>
                <div className="cancel">
                  <button onClick={handelClick}>Cancel Booking</button>
                  <p>
                    By clicking on this button you will loose your reservation
                  </p>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};
