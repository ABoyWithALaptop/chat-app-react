import React, { FC, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { getAuthUser } from "./api";
import { useAuth } from "./hooks/useAuth";
import { User } from "./types/types";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

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
