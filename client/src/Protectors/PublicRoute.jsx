import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? <Navigate to="/user" /> : children;
};

PublicRoute.propTypes = {
  children: propTypes.node.isRequired,
};
