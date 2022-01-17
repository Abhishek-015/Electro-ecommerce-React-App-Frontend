import React from "react";

const ProductSelectOption = ({
  heading,
  selectShipping,
  handleChange,
  colors,
  brands,
  categories,
  loading
}) => (
  <div className="form-group">
   {loading?<h4 className="text-danger">Loading...</h4>:<label>{heading}</label>}
    <select
      name={heading.toLowerCase()}
      className="form-control bg-secondary text-white"
      onChange={handleChange}
    >
      <option className="bg-secondary text-white">Please Select</option>
      {selectShipping || colors || brands
        ? (selectShipping || colors || brands).map((el) => (
            <option className="bg-secondary text-white" value={el} key={el}>
              {el}
            </option>
          ))
        : categories.map((el) => (
            <option className="bg-secondary text-white" value={el._id} key={el._id}>
              {el.name}
            </option>
          ))}
    </select>
  </div>
);

export default ProductSelectOption;
