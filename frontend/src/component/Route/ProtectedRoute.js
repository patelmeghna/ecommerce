import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return loading ? (
    <Loader />
  ) : isAdmin === true && user.role !== "admin" ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default ProtectedRoute;
