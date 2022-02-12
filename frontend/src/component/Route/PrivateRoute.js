import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return loading ? (
    <Loader />
  ) : (isAuthenticated === false ? (
    <Navigate to="/login" />
  ) : (
    children
  ));

};

export default PrivateRoute;
