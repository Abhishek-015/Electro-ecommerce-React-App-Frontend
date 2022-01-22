import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { LoadingOutlined } from "@ant-design/icons";

import { createProduct } from "../../../utils/product";
import { getCategories, getCategorySubs } from "../../../utils/category";

import AdminNav from "../../../component/nav/AdminNav";
import ProductInput from "../../../component/inputField/productInput";
import ProductSelectOption from "../../../component/selectOption/productSelectOption";
import MultiSelectOption from "../../../component/multiSelectOption/productMultiSelectOption";
import FileUplaod from "../../../component/imageUpload/imageUpload";

const ProductUpdate = ({match}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const {slug} = match.params

  const selectShipping = ["No", "Yes"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Product Update form</h4>
          <hr />
        {JSON.stringify(slug)}
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
