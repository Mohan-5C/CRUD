import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

export const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

ProtectRoute.propTypes = {
  children: propTypes.node.isRequired,
};
