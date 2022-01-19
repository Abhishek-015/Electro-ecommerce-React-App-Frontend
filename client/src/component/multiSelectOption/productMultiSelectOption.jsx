import React from "react";
import { Select } from "antd";
const { Option } = Select;

const MultiSelectOption = ({ heading,values,setValues,subCategoryOption,showSubCategories,subCategory}) => (
 showSubCategories &&<div>
    <label>{heading}</label>
    <Select
      mode="multiple"
      className="container-fluid bg-secondary text-black"
      placeholder="Please select"
      value={subCategory}
      onChange={value=>setValues({...values,subCategory:value})}      
    >
      {subCategoryOption.length && subCategoryOption.map(el=>(
        <Option key={el._id} value={el._id}>{el.name}</Option>
        ))}
    </Select>
  </div>
);

export default MultiSelectOption;
