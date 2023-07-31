import React from "react";
import Map from "../components/Map";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

const MainMap = () => {
  return (
    <div>
      <Header />
      <div className="fluid-container">
        <Map />
        {/* <div className="details text-center pt-5">
          <button className="btn btn-primary">Reset Map Center</button>
          <Link to="lands">Go To Lands</Link>
        </div> */}
      </div>
    </div>
  );
};

export default MainMap;
