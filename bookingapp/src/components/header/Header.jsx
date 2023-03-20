import {
  Add,
  AirportShuttle,
  CalendarMonth,
  DirectionsCar,
  Flight,
  LocalHotel,
  Person,
  Remove,
} from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "./header.scss";
import { SearchContext } from "../../context/SearchContext.js";
import { AuthContext } from "../../context/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ type }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    childrens: 0,
    rooms: 1,
  });

  const handelOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i"
            ? options[name] + 1
            : options[name] > 0
            ? options[name] - 1
            : options[name],
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handelSerach = () => {
    if (destination === "") alert("Enter a destination");
    else {
      dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
      navigate(
        "/hotels",
        { state: { destination, date, options } }
      );
    }
  };

  return (
    <div className="header">
      <div className={"container " + type}>
        <div className="lists">
          <div className="Listitem active">
            <LocalHotel className="icon" />
            <p>Hotel</p>
          </div>
          <div className="Listitem">
            <Flight className="icon" />
            <p>Flights</p>
          </div>
          <div className="Listitem">
            <DirectionsCar className="icon" />
            <p>Taxi</p>
          </div>
          <div className="Listitem">
            <AirportShuttle className="icon" />
            <p>AirportTaxi</p>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="slogan">Find your next stay</h1>
            <p className="desc">
              Search deals on hotels, homes, and much more...
            </p>
            {!user && (
              <Link to="/login">
                <button className="Headerbtn">SignIn/Register</button>
              </Link>
            )}

            <div className="search">
              <div className="searchItem">
                <LocalHotel className="searchIcon" />
                <input
                  className="searchInput"
                  type="text"
                  placeholder="where are you going?"
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
              <div className="searchItem">
                <CalendarMonth className="searchIcon" />
                <span
                  className="searchText"
                  onClick={() => {
                    setOpenDate(!openDate);
                    setOpenOptions(false);
                  }}
                >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    ranges={date}
                    className="date"
                  />
                )}
              </div>
              <div className="searchItem">
                <Person className="searchIcon" />
                <span
                  className="searchText"
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                >{`${options.adult} Adults ${options.childrens} Childrens ${options.rooms} Rooms`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <div className="optionText">Adult</div>
                      <div className="optionButton">
                        <Add
                          className="optionIcon add"
                          onClick={() => handelOption("adult", "i")}
                        />
                        <span className="optionValue">{options.adult}</span>
                        <Remove
                          className="optionIcon"
                          onClick={() => handelOption("adult", "d")}
                        />
                      </div>
                    </div>
                    <div className="optionItem">
                      <div className="optionText">Childrens</div>
                      <div className="optionButton">
                        <Add
                          className="optionIcon add"
                          onClick={() => handelOption("childrens", "i")}
                        />
                        <span className="optionValue">{options.childrens}</span>
                        <Remove
                          className="optionIcon"
                          onClick={() => handelOption("childrens", "d")}
                        />
                      </div>
                    </div>
                    <div className="optionItem">
                      <div className="optionText">Rooms</div>
                      <div className="optionButton">
                        <Add
                          className="optionIcon add"
                          onClick={() => handelOption("rooms", "i")}
                        />
                        <span className="optionValue">{options.rooms}</span>
                        <Remove
                          className="optionIcon"
                          onClick={() => handelOption("rooms", "d")}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="searchItem">
                <button className="Headerbtn" onClick={handelSerach}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
