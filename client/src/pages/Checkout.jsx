// require('react-quill/dist/quill.snow.css');
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, emptyUserCart, saveUserAddress } from "../utils/user";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // ES6

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState("");

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

  const saveAddressToDb = () => {
    // console.log(address)
    saveUserAddress(user.token,address).then(res=>{
       if(res.data.ok){
         setAddressSaved(true)
         toast.success('Address Saved')
       }
    })
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <br />
        <h4>Delivery Address</h4>
        <br />
        {/* little bit change in onchange for react quill */}
        <ReactQuill theme="snow" value={address} onChange={setAddress} />{" "}
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
            <button className="btn btn-primary btn-sm  m-1" disabled={!addressSaved || !products.length}>Place Order</button>
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
