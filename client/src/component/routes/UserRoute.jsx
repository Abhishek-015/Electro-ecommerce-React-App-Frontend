import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// for protecting the route
const UserRoute = ({ children, ...restProps }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...restProps} render={() => children} />
  ) : (
    <h4 className="text-danger">Loading...</h4>
  );
};

export default UserRoute;
