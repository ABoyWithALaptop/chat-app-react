import React, { FC, useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { SocketContext } from "../utils/context/SocketContext";
import { useAuth } from "../utils/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const socket = useContext(SocketContext);
  const auth = useAuth(); //  * get user authentication and update to redux store
  console.log("protected");

  if (auth.loading) {
    return <div>Loading</div>;
  } else {
    if (!auth.user) {
      socket.disconnect();
      return (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
      );
    } else {
      if (!socket.connected) {
        socket.connect();
      }
      socket.emit("joinConversations");
      return <>{children}</>;
    }
  }
};
