import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch } from "../store";
import { addMessage } from "../store/conversationSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { MessageEventPayload } from "../utils/types/types";

export const ConversationChannelPage = () => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // console.log(socket);
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      const { conversation, ...message } = payload;
      dispatch(addMessage(payload));
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, []);
  return (
    <ConversationChannelPageStyle>
      <MessagePanel></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
