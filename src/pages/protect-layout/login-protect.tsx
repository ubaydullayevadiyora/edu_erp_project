import { getItem } from "../../helpers";
import { Navigate } from "react-router-dom";
import type { ProtectedRoute } from "@types";

const LoginProtect = ({ children }: ProtectedRoute) => {
  const isAuth = getItem("access_token");
  const role = getItem("role");
  if (isAuth) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <>{children}</>;
};

export default LoginProtect;
