import React, { useEffect, useState } from "react";
import { getProducts } from "../../utils/product";

import ProductCard from "../cards/ProductCard";
import TypeWriterEffect from "../typewriter/TypeWriterEffect";
import LoadingCardEffect from "../loadingEffect/loadingCardEffect";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", 3)
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
      <div className="container">
        {loading ? (
          <LoadingCardEffect count={3} />
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

export default NewArrivals;
