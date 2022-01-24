import React from "react";

const ProductSelectOption = ({
  heading,
  selectShipping,
  handleChange,
  colors,
  brands,
  categories,
  category,
  name,
  color,
  brand,
  prePopulateSelectShipping
}) => (
  <div className="form-group">
    <label>{heading}</label>
    <select
      name={name ? name : heading.toLowerCase()}
      className="form-control bg-secondary text-white"
      value={
          brand
          ? brand
          : selectShipping && prePopulateSelectShipping
          ? selectShipping === "Yes"
            ? "Yes"
            : "No"
          : color
          ? color
          : null
      }
      onChange={handleChange}
    >
      <option className="bg-secondary text-white">{category?category:"Please select"}</option>
      {selectShipping || colors || brands
        ? (selectShipping || colors || brands).map((el) => (
            <option className="bg-secondary text-white" value={el} key={el}>
              {el}
            </option>
          ))
        : categories.map((el) => (
            <option
              className="bg-secondary text-white"
              value={el._id}
              key={el._id}
            >
              {el.name}
            </option>
          ))}
    </select>
  </div>
);

export default ProductSelectOption;
