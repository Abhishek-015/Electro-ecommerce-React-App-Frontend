import React, { useState } from "react";
import DatePicker from "react-datepicker"; // to get date table format
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from "../../../utils/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import AdminNav from "../../../component/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  //redux
  const {user} = useSelector(state => ({...state}))

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    createCoupon({name,expiry,discount},user.token)
    .then(res=>{
      setLoading(false);
      setName("");
      setDiscount('');
      setExpiry("")
      toast.success(`"${res.data.name}" is created`)
    }).catch(err=>{
      setLoading(false)
      console.log(err)})
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={expiry}
                onChange={(date) => setExpiry(date)}
                required
              />
            </div>
            <button className="btn btn-primary btn-sm my-2">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
