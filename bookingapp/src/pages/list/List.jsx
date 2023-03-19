import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { format } from "date-fns";
import "./list.scss";
import { DateRange, DateRangePicker } from "react-date-range";
import { SearchItem } from "../../components/searchItem/SearchItem";
import { Footer } from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch.js";
import { AuthContext } from "../../context/AuthContext";

export const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { user } = useContext(AuthContext);

  const { data, loading, reFetch } = useFetch(
    `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/hotels?city=${destination.toLowerCase()}&min=${
      min || 0
    }&max=${max || 99999}`
  );

  const handelClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="lsDestination">Destination</label>
              <input
                type="text"
                placeholder={destination}
                className="lsDestination"
                id="lsDestination"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>CheckIn-CheckOut</label>
              <span
                className="lsDate"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.childrens}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.rooms}
                  />
                </div>
              </div>
            </div>
            <button onClick={handelClick}>Search</button>
          </div>
          <div className="listResult">
            {data.map((hotel, i) => (
              <Link to={user ? `/hotels/${hotel._id}` : "/login"} key={i}>
                <SearchItem hotel={hotel} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
