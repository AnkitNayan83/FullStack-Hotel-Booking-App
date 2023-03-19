import React from "react";
import "./emailList.scss";

export const EmailList = () => {
  return (
    <div className="el">
      <div className="container">
        <h1>Save time,Save money</h1>
        <h3>Subscribe to our website to never miss any exciting offers</h3>
        <form>
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};
