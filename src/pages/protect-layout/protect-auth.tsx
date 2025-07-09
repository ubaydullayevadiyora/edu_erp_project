import { Navigate } from 'react-router-dom';

import type { ProtectedRoute } from "@types";
import { getItem } from "@helpers";

const ProtectAuth = ({ children }: ProtectedRoute) => {
  const isAuth = getItem("access_token") !== null;
  if (!isAuth) {
    return <Navigate to="/" replace />;
  };

  return<>{children}</>;
};

export default ProtectAuth;
