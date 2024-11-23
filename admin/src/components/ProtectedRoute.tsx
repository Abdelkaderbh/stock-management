import React,{useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children || <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;