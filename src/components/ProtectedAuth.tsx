import React, { FC } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../utils/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  console.log("protected");

  if (auth.loading) {
    return <div>Loading</div>;
  } else {
    if (!auth.user) {
      return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
      );
    } else return <>{children}</>;
  }
};
