import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { showDisplayUser } from "../components/conversation/ConversationsSidebar";
import { MessagePanel } from "../components/messages/MessagePanel";
import { RootState } from "../store";
import { getConversationMessages, getConversationsById } from "../utils/api";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { Message, MessageEventPayload, User } from "../utils/types/types";

const addMessage = (
  setState: React.Dispatch<React.SetStateAction<Message[]>>,
  message: Message
) => {
  setState((prev) => [message, ...prev]);
};

export const ConversationChannelPage = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const [message, setMessage] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState<User>();
  useEffect(() => {
    getConversationMessages(parseInt(id!)).then(({ data }) => {
      setMessage(data);
    });
    getConversationsById(parseInt(id!)).then(({ data }) => {
      setRecipient(data.recipient);
      const reciptPerson = showDisplayUser(data, user!);
      setRecipient(reciptPerson);
    });
  }, [id]);

  useEffect(() => {
    // console.log(socket);
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      const { conversation, ...message } = payload;
      addMessage(setMessage, payload);
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, []);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={message} recipient={recipient!}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
