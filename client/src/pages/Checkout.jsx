import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../utils/user";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);
  const saveAddressToDb = () => {};
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        Text area
        <button className="btn btn-primary m-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupen</h4>
        <br />
        Cpupen input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((prod, ind) => (
          <div key={ind}>
            <p>
              {prod.product.title} ({prod.color}) x {prod.count} ={" "}
              ₹{prod.product.price*prod.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total : {total}</p>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary m-1">Place Order</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary m-1">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
