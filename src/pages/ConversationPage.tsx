import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar";
import { AppDispatch, RootState } from "../store";
import {
  addConversation,
  fetchConversationsThunk,
} from "../store/conversationSlice";
import { SocketContext } from "../utils/context/SocketContext";
import { Page } from "../utils/styles";
import { Conversation } from "../utils/types/types";

export const ConversationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      // const { conversation, ...message } = payload;
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off("newConversation");
    };
  }, []);

  return (
    <Page>
      <ConversationsSidebar conversations={conversation} />
      <Outlet />
    </Page>
  );
};
