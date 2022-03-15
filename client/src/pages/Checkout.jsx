import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart } from "../utils/user";

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

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    //remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    //remove from mongodb(backend)
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("cart is empty. Continue shopping");
    });
  };

  const saveAddressToDb = () => {};

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        Text area
        <button
          className="btn btn-primary btn-sm py-0 m-2"
          onClick={saveAddressToDb}
        >
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
              {prod.product.title} ({prod.color}) x {prod.count} = ₹
              {prod.product.price * prod.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total : {total}</p>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary btn-sm  m-1">Place Order</button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary btn-sm  m-1"
              disabled={!products.length}
              onClick={emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
