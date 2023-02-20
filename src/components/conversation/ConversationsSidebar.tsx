import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle,
} from "../../utils/styles";
import { TbEdit } from "react-icons/tb";
import { FC, useContext, useState } from "react";
import { Conversation, Message, User } from "../../utils/types/types";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { CreateConversationModal } from "../modals/CreateConversationModal";
import { AuthContext } from "../../utils/context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
type Props = {
  conversations: Conversation[];
};

// * show the person receive message in the conversations (thats mean not you, the guy send message)
export const showDisplayUser = (conversation: Conversation, user: User) => {
  return conversation.creator.id !== user?.id
    ? conversation.creator
    : conversation.recipient;
};
export const ConversationsSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const showShortMessage = (content: string) => {
    return content.length > 100 ? <>{content.slice(0, 99)}&hellip;</> : content;
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
            const guess = showDisplayUser(conversation, user!);

            return (
              <ConversationSidebarItem
                onClick={() => {
                  navigate(`/conversations/${conversation.id}`);
                }}
                key={conversation.id}
              >
                <div className={styles.conversationAvatar}></div>
                <div className={styles.info}>
                  <span className={styles.conversationName}>
                    {" "}
                    {`${guess.lastName}  ${guess.firstName}`}
                  </span>
                  <span className={styles.conversationLastMessage}>
                    {" "}
                    {showShortMessage(conversation.lastMessageSent.content)}
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
