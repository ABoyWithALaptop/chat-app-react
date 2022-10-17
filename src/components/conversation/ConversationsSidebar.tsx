import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { FC, useState } from "react";
import { ConversationType } from "../../utils/types/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { CreateConversationModal } from "../modals/CreateConversationModal";
type Props = {
  conversations: ConversationType[];
};

export const ConversationsSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);

  return (
    <>
      {showModel && <CreateConversationModal setShowModel={setShowModel} />}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          <div onClick={() => setShowModel(!showModel)}>
            <TbEdit size={32} />
          </div>
        </ConversationSidebarHeader>

        <ConversationSidebarContainer>
          {conversations.map((conversation) => (
            <ConversationSidebarItem
              onClick={() => navigate(`/conversations/${conversation.id}`)}
              key={conversation.id}
            >
              <div className={styles.conversationAvatar}></div>
              <div>
                <span className={styles.conversationName}>
                  {" "}
                  {conversation.name}
                </span>
                <span className={styles.conversationLastMessage}>
                  {" "}
                  {conversation.lastMessage}
                </span>
              </div>
            </ConversationSidebarItem>
          ))}
        </ConversationSidebarContainer>
      </ConversationSidebarStyle>
    </>
  );
};
