import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar";
import { getConversations } from "../utils/api";
import { ConversationContext } from "../utils/context/ConversationContext";
import { Page } from "../utils/styles";
import { Conversation } from "../utils/types/types";

export const ConversationPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        console.log(data);
        setConversations(data);
      })
      .catch((err) => console.error(err));

    return () => {};
  }, []);

  return (
    <Page>
      <ConversationsSidebar conversations={conversations} />
      <Outlet />
    </Page>
  );
};
