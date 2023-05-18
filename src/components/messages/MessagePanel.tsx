import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MessagePanelBodyStyle, MessagePanelStyle } from "../../utils/styles";
import { Message, User } from "../../utils/types/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchConversationsThunk,
  fetchMessagesThunk,
  selectConversationById,
  updateMessage,
} from "../../store/conversationSlice";
import { showDisplayUser } from "../conversation/ConversationsSidebar";
import { SocketContext } from "../../utils/context/SocketContext";

export const MessagePanel: FC = () => {
  // if (!messages) messages = [];
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const idConversation = parseInt(id!);
  const dispatch = useDispatch<AppDispatch>();
  const [recipient, setRecipient] = useState<User>();
  const socket = useContext(SocketContext);
  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, idConversation)
  );
  console.log("conversation: ", conversation);
  const fetchingStatus = useSelector(
    (state: RootState) => state.conversation.fetching
  );

  useEffect(() => {
    console.log("fetchingStatus: ", fetchingStatus);
    if (fetchingStatus) {
      const reciptPerson = showDisplayUser(conversation!, user!);
      console.log("reciptPerson: ", reciptPerson);
      setRecipient(reciptPerson);
      if (!conversation?.messages) dispatch(fetchMessagesThunk(idConversation));
    }
  }, [id, fetchingStatus]);

  return (
    <MessagePanelStyle>
      <MessagePanelHeader recipient={recipient}></MessagePanelHeader>
      <MessagePanelBodyStyle>
        <MessageContainer
          messages={conversation?.messages ? conversation.messages : []}
        />
        <MessageInputField />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
