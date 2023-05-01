import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar";
import { AppDispatch, RootState } from "../store";
import {
  addConversation,
  addMessage,
  fetchConversationsThunk,
} from "../store/conversationSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { Page } from "../utils/styles";
import { Conversation, MessageEventPayload } from "../utils/types/types";

export const ConversationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const conversation = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  console.log("conversation: ", conversation);

  useEffect(() => {
    console.log("fetch in conversation page");
    dispatch(fetchConversationsThunk());
    socket.on("newConversation", (payload: Conversation) => {
      console.log("newConversation received", payload);
      navigate(`/conversations/${payload.id}`);
      // const { conversation, ...message } = payload;
      dispatch(addConversation(payload));
    });
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      const { conversation, ...message } = payload;
      dispatch(addMessage(payload));
    });
    return () => {
      socket.off("newConversation");
      socket.off("onMessage");
    };
  }, []);

  return (
    <Page>
      <ConversationsSidebar conversations={conversation} />
      <Outlet />
    </Page>
  );
};
