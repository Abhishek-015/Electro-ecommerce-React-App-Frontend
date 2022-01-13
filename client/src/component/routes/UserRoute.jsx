import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

// for protecting the user route
const UserRoute = ({ children, ...restProps }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...restProps} render={() => children} />
  ) : (
    <LoadingToRedirect/>
  );
};

export default UserRoute;
