import React, { useEffect, useState } from "react";
import { getProductsBYCount } from "../utils/product";

import ProductCard from "../component/cards/ProductCard";
import TypeWriterEffect from "../component/typewriter/TypeWriterEffect";
import LoadingCardEffect from "../component/loadingEffect/loadingCardEffect";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBYCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log("home Page show products error --->", err.message);
      });
  };

  return (
    <>
      <div className="jumbotron text-primary h1 font-weight-bold text-center">
        <TypeWriterEffect
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>
      <div className="container">
        {loading ? (
          <LoadingCardEffect count = {3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
