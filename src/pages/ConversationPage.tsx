import { Outlet, useParams } from "react-router";
import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar";
import { Page } from "../utils/styles";
import mockConversations from "../__mocks__/conversations";

export const ConversationPage = () => {
  const { id } = useParams();

  return (
    <Page>
      <ConversationsSidebar conversations={[]} />
      <Outlet />
    </Page>
  );
};
