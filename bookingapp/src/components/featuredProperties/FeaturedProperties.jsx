import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.scss";

export const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");
  return (
    <div className="fp">
      {loading
        ? "loading please wait"
        : data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img src={item?.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{`${item?.name}  ${item?.type}`}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">
                Starting from Rs {item?.cheapestPrice}
              </span>
              <div className="fpRating">
                <button>
                  {Math.floor(Math.random() * 2) + 8}.
                  {Math.floor(Math.random() * 2) + 8}
                </button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
    </div>
  );
};
