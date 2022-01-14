import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//importing ant icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  createCategory,
  getCategories,
  getCategory,
  removeCategory,
} from "../../../utils/category";

import AdminNav from "../../../component/nav/AdminNav";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((cat) => setCategories(cat.data))
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.name}" is deleted`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const createCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={!name || name.length < 2 || loading}
        >
          Create
        </button>
      </div>
    </form>
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
            <h4>Create product Page</h4>
          )}
          {createCategoryForm()}
          <br />
          {categories.map((category) => (
            <div className="alert alert-success" key={category._id}>
              {category.name}
              <span
                onClick={() => handleRemove(category.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-primary" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
