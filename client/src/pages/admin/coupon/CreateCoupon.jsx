import React from "react";
import DatePicker from "react-datepicker"; // to get date table format
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from "../../../utils/coupon";
import { DeleteOutlined } from "@ant-design/icons";

import AdminNav from "../../../component/nav/AdminNav";

const CreateCouponPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Coupon</h4>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
