import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { FC, useContext, useState } from "react";
import { Conversation } from "../../utils/types/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { CreateConversationModal } from "../modals/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";
type Props = {
  conversations: Conversation[];
};

export const ConversationsSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const { user } = useContext(AuthContext);

  const showDisplayUser = (conversation: Conversation) => {
    return conversation.creator.id !== user?.id
      ? conversation.creator
      : conversation.recipient;
  };

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
          {conversations.map((conversation) => {
            const guess = showDisplayUser(conversation);

            return (
              <ConversationSidebarItem
                onClick={() => navigate(`/conversations/${conversation.id}`)}
                key={conversation.id}
              >
                <div className={styles.conversationAvatar}></div>
                <div>
                  <span className={styles.conversationName}>
                    {" "}
                    {`${guess.lastName}  ${guess.firstName}`}
                  </span>
                  <span className={styles.conversationLastMessage}>
                    {" "}
                    {conversation.lastMessage}
                  </span>
                </div>
              </ConversationSidebarItem>
            );
          })}
        </ConversationSidebarContainer>
      </ConversationSidebarStyle>
    </>
  );
};
