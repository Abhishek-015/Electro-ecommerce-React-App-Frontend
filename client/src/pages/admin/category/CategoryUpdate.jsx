import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getCategory, updateCategory } from "../../../utils/category";

import AdminNav from "../../../component/nav/AdminNav";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const previousCategory = useRef("");

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug)
      .then((cat) => {
        setName(cat.data.name);
        previousCategory.current = cat.data.name;
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(
          `"${previousCategory.current} is updated to" "${res.data.name}"`
        );
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
          Update
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
            <h4>Update Category </h4>
          )}
          {createCategoryForm()}
          <br />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
