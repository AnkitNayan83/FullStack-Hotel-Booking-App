import React, { useContext, useState } from "react";
import "./featured.scss";
import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

export const Featured = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    childrens: 0,
    rooms: 1,
  });

  const { data, error, loading } = useFetch(
    "https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/hotels/countByCity/?cities=delhi,goa,mumbai"
  );

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handelCLick = (destination) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading Please Wait"
      ) : (
        <>
          <div className="featuredItem" onClick={() => handelCLick("goa")}>
            <img
              src="https://q-xx.bstatic.com/xdata/images/region/250x250/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Goa</h1>
              <h2>{data[1]} Hotels</h2>
            </div>
          </div>

          <div className="featuredItem" onClick={() => handelCLick("delhi")}>
            <img
              src="https://r-xx.bstatic.com/xdata/images/city/250x250/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[0]} Hotels</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={() => handelCLick("mumbai")}>
            <img
              src="https://q-xx.bstatic.com/xdata/images/city/250x250/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[2]} Hotels</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
