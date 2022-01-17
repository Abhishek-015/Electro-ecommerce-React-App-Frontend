import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createProduct } from "../../../utils/product";

import AdminNav from "../../../component/nav/AdminNav";
// import CategoryForm from "../../../component/forms/CategoryForm";
// import LocalSearch from "../../../component/forms/LocalSearch";

const ProductCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">Product Create Page</div>
      </div>
    </div>
  );
};
export default ProductCreate;
