import React from "react";

import TypeWriterEffect from "../component/typewriter/TypeWriterEffect";
import NewArrivals from "../component/home/NewArrivals";
import BestSellers from "../component/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-primary h1 font-weight-bold text-center">
        <TypeWriterEffect
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>
      <h4 className="text-center p-3 my-5 display-5 jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="text-center p-3 my-5 display-5 jumbotron">Best Sellers</h4>
      <BestSellers />
      <br />
      <br />
    </>
  );
};

export default Home;
