import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

interface PublicRouteProps{
    children:React.ReactNode;
}

export const PublicRoute:React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? <Navigate to="/user" /> : children;
};

PublicRoute.propTypes = {
  children: propTypes.node.isRequired,
};
