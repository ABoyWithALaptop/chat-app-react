import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";
import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar";
import { AppDispatch, RootState } from "../store";
import { fetchConversationsThunk } from "../store/conversationSlice";
import { Page } from "../utils/styles";

export const ConversationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const conversation = useSelector(
    (state: RootState) => state.conversation.conversations
  );

  useEffect(() => {
    console.log("fetch in conversation page");
    dispatch(fetchConversationsThunk());
  }, []);

  return (
    <Page>
      <ConversationsSidebar conversations={conversation} />
      <Outlet />
    </Page>
  );
};
