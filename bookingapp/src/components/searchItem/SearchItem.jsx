import React from "react";
import "./searchItem.scss";

export const SearchItem = ({ hotel }) => {
  return (
    <div className="filterItem">
      <img src={hotel.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.dsitance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{hotel.address}</span>
        <span className="siFeatures">{hotel.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>
            {Math.floor(Math.random() * 2) + 8}.
            {Math.floor(Math.random() * 2) + 8}
          </button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rs {hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};
