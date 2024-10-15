import { Navigate } from "react-router-dom";
import propTypes from "prop-types";

interface ProtectRouteProps{
    children:React.ReactNode;
}

export const ProtectRoute:React.FC<ProtectRouteProps> = ({children}) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

ProtectRoute.propTypes = {
  children: propTypes.node.isRequired,
};
