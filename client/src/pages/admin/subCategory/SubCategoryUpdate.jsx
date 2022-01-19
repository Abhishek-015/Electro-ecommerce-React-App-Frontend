import React, { useEffect,useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { updateSubCategory, getSubCategory } from "../../../utils/subCategory";

import { getCategories } from "../../../utils/category";

import AdminNav from "../../../component/nav/AdminNav";
import CategoryForm from "../../../component/forms/CategoryForm";

const SubCategoryUpdate = ({ match, history }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const handleChange = (e) => setName(e.target.value);

  const loadCategories = () =>
    getCategories()
      .then((cat) => setCategories(cat.data))
      .catch((err) => console.log(err));

  const loadSubCategory = () =>
    getSubCategory(slug)
      .then((sub) => {
        setName(sub.data.name);
        setParentCategory(sub.data.parent);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubCategory(slug, { name, parent: parentCategory }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        console.log(res.data)
        toast.success(`"${res.data.name}" is updated.`);
        history.push("/admin/subCategory");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const restProps = { handleSubmit, name, handleChange, loading };

  const createCategoryForm = () => (
    <CategoryForm btnName="Update" label="Sub-category Name" {...restProps} />
  );

  const parentCategorySelectionForm = () => (
    <div className="form-group">
      <label>Parent Category</label>
      <select
        name="category"
        placeholder="select category"
        className="form-control bg-secondary text-white"
        onChange={(e) => setParentCategory(e.target.value)}
      >
        <option className="bg-secondary text-white">Please Select</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option
              className="bg-secondary text-white"
              key={category._id}
              value={category._id}
              selected={category._id === parentCategory}
              defaultChecked={true}
            >
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update Sub-category</h4>
          )}
          {parentCategorySelectionForm()}
          {createCategoryForm()}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
