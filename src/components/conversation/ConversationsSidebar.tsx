import { ConversationSidebarStyle } from "../../utils/styles"
import { TbEdit } from "react-icons/tb"

export const ConversationsSidebar = () => {
  return (
    <ConversationSidebarStyle>
      <header>
        <h1>Conversations</h1>
        <TbEdit size={32} />
      </header>
    </ConversationSidebarStyle>
  )
}