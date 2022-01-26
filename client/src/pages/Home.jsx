import React, { useEffect, useState } from "react";
import { getProductsBYCount } from "../utils/product";

import ProductCard from "../component/cards/ProductCard";

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
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("home Page show products error --->", err.message);
      });
  };

  return (
    <>
      <div className="jumbotron">
        {loading ? (
          <h4 className="test-danger">Loading...</h4>
        ) : (
          <h4>All Products</h4>
        )}
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
