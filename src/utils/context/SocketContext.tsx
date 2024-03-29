import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL!, {
  withCredentials: true,
  autoConnect: false,
});
export const SocketContext = createContext(socket);
