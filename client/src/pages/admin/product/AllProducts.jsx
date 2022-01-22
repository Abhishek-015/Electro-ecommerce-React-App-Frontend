import React, { useEffect, useState } from "react";
import AdminNav from "../../../component/nav/AdminNav";
import { getProductsBYCount } from "../../../utils/product";

import { LoadingOutlined } from "@ant-design/icons";

import AdminProductCard from "../../../component/cards/AdminProductCards";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsBYCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger ml-5 h1" />
          ) : (
            <h4 className="m-3">All Products</h4>
          )}
          <hr style={{color:"red"}} />
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 my-1">
                <AdminProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
