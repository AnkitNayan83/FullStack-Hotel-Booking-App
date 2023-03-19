import React, { useContext } from "react";
import { EmailList } from "../../components/emailList/EmailList";
import { Featured } from "../../components/featured/Featured";
import { FeaturedProperties } from "../../components/featuredProperties/FeaturedProperties";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { PropertyList } from "../../components/propertyList/PropertyList";
import "./home.scss";

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by hotel type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <EmailList />
        <Footer />
      </div>
    </div>
  );
};
