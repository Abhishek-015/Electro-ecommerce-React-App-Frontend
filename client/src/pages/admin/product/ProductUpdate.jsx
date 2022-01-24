import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { LoadingOutlined } from "@ant-design/icons";

import { getProduct } from "../../../utils/product";
import { getCategories, getCategorySubs } from "../../../utils/category";

import AdminNav from "../../../component/nav/AdminNav";
import ProductInput from "../../../component/inputField/productInput";
import ProductSelectOption from "../../../component/selectOption/productSelectOption";
import MultiSelectOption from "../../../component/multiSelectOption/productMultiSelectOption";
import FileUplaod from "../../../component/imageUpload/imageUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategoryOption, setSubCategoryOption] = useState([]);
  const [showSubCategories, setShowSubCategories] = useState(true);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [prePopulateSelectShipping,setPrePopulateSelectShipping] = useState(true)

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  const {
    title,
    description,
    price,
    category,
    subCategory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setValues({ ...values, ...res.data });
      getCategorySubs(res.data.category._id).then((res) => {
        setSubCategoryOption(res.data);
      });
      const subCategoryIdArray = [];
      res.data.subCategory.map((subCat) => subCategoryIdArray.push(subCat._id));
      setSubCategoryArray(prev => subCategoryIdArray);  //requires for ant design select to work
    });
  };

  const loadCategories = () => {
    getCategories(category)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subCategory: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubCategoryOption(res.data);
    });
  };

  const selectShipping = ["No", "Yes"];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger m-3 h1" />
          ) : (
            <h4 className="my-3">Product Update</h4>
          )}

          <hr />
          <div className="p-3">
            <FileUplaod
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <ProductInput
              heading="Title"
              type="text"
              value={title}
              handleChange={handleChange}
            />
            <ProductInput
              heading="Description"
              type="text"
              value={description}
              handleChange={handleChange}
            />
            <ProductInput
              heading="Price"
              type="number"
              value={price}
              handleChange={handleChange}
            />
            <ProductSelectOption
              heading="Shipping"
              selectShipping={selectShipping}
              handleChange={handleChange}
            />
            <ProductInput
              heading="Quantity"
              type="number"
              value={quantity}
              handleChange={handleChange}
            />
            <ProductSelectOption
              heading="Color"
              color={color}
              colors={colors}
              handleChange={handleChange}
            />
            <ProductSelectOption
              heading="Brand"
              brand={brand}
              brands={brands}
              handleChange={handleChange}
            />
            <ProductSelectOption
              heading="Category"
              category={category.name}
              categories={categories}
              handleChange={handleCategoryChange}
            />
            <MultiSelectOption
              heading="Sub Category"
              values={values}
              // subCategory={subCategory}
              setValues={setValues}
              showSubCategories={showSubCategories}
              subCategoryOption={subCategoryOption}
              subCategoryArray={subCategoryArray}
              setSubCategoryArray={setSubCategoryArray}
              prePopulateSelectShipping={prePopulateSelectShipping}
            />
            <button className="btn btn-outline-info px-4 my-3">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
