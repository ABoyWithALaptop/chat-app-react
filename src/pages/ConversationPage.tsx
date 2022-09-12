import { Outlet, useParams } from "react-router"
import { ConversationPanel } from "../components/conversation/ConversationPanel"

import { ConversationsSidebar } from "../components/conversation/ConversationsSidebar"
import { Page } from "../utils/styles"

export const ConversationPage = () => {
  const { id } = useParams()

  return (
    <Page>
      <ConversationsSidebar />
      <Outlet />
    </Page>
  )
}