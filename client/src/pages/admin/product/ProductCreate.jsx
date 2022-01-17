import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createProduct } from "../../../utils/product";

import AdminNav from "../../../component/nav/AdminNav";
import ProductInput from "../../../component/inputField/productInput";
import ProductSelectOption from "../../../component/selectOption/productSelectOption";
import { createCategory } from "../../../utils/category";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
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

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const {user} = useSelector(state=>({...state}))

  const {
    title,
    description,
    price,
    categories,
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

  const handleSubmit = e=> {
      e.preventDefault()
      createProduct(values,user.token)
      .then(res=>{
          console.log(res.data)
          toast.success('Product created')
      })
      .catch(err=>{
          console.log(err)
          if(err.response.status===400) toast.error(err.response.data)
      })
      
  }

  const handleChange = ({target}) =>{
      const {name,value} = target
      setValues({...values,[name]:value})
  }

  const selectShipping = ["No","Yes"]

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4 className="my-3">Product Create</h4>
          <hr />
          <form onSubmit={handleSubmit}>
              <ProductInput heading='Title' type='text' value={title} handleChange={handleChange}/>
              <ProductInput heading='Description' type='text' value={description} handleChange={handleChange}/>
              <ProductInput heading='Price' type='number' value={price} handleChange={handleChange}/>
              <ProductSelectOption heading='Shipping' selectShipping={selectShipping} handleChange={handleChange}/>
              <ProductInput heading='Quantity' type='number' value={quantity} handleChange={handleChange}/>
              <ProductSelectOption heading='Color' colors={colors} handleChange={handleChange}/>
              <ProductSelectOption heading='Brand' brands={brands} handleChange={handleChange}/>
              <button className="btn btn-outline-info px-4 my-3">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
