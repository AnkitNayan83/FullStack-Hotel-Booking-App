import React, { useContext, useState } from "react";
import "./hotel.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { EmailList } from "../../components/emailList/EmailList";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  LocationOn,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Reserve } from "../../components/reserve/Reserve";

export const Hotel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `https://full-stack-hotel-booking-d1h7b8kdv-ankitnayan83.vercel.app/api/hotels/find/${id}`
  );
  const [slideNo, setSlideNo] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);

  const handelOpen = (i) => {
    setSlideNo(i);
    setShowSlider(true);
  };

  const handelSlide = (dir) => {
    if (dir === "right") {
      if (slideNo < 5) setSlideNo(slideNo + 1);
    } else {
      if (slideNo > 0) setSlideNo(slideNo - 1);
    }
  };

  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

  const handelClick = () => {
    if (user) {
      setOpenRoom(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading please wait!"
      ) : (
        <div className="hotel">
          {showSlider && (
            <div className="slider">
              <ArrowBackIos
                className="left"
                onClick={() => handelSlide("left")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[slideNo]} alt="" className="sliderImg" />
              </div>
              <ArrowForwardIos
                className="right"
                onClick={() => handelSlide("right")}
              />
              <Close className="close" onClick={() => setShowSlider(false)} />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handelClick}>
              Reserve Now
            </button>
            <h1 className="hotelTitle">
              {data.name} ({data.type})
            </h1>
            <div className="hotelAddress">
              <LocationOn />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.distance}</span>
            <span className="hotelPriceHighlight">
              Book a stay over Rs {data.cheapestPrice} at this hotel and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((img, i) => (
                <div className="hotelImgContainer" key={i}>
                  <img
                    onClick={() => handelOpen(i)}
                    src={img}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay !</h1>
                <span>
                  Located in the real heart of Town, this {data.type} has an
                  excellent rating of {Math.floor(Math.random() * 2) + 8}.
                  {Math.floor(Math.random() * 2) + 8}
                </span>
                <h2>
                  <b>Rs {data.cheapestPrice * days * options.rooms}</b>
                </h2>
                <h3>
                  ({days}
                  nights & {options.rooms} rooms)
                </h3>
                <strong>Free Breakfast</strong>
                <button onClick={handelClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <EmailList />
      <Footer />
      {openRoom && <Reserve setOpenRoom={setOpenRoom} hotelId={id} />}
    </div>
  );
};
