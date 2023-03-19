import { FC, useEffect, useState } from "react";
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
} from "../../store/conversationSlice";
import { showDisplayUser } from "../conversation/ConversationsSidebar";

export const MessagePanel: FC = () => {
  // if (!messages) messages = [];
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const idConversation = parseInt(id!);
  const dispatch = useDispatch<AppDispatch>();
  const [recipient, setRecipient] = useState<User>();
  const conversation = useSelector(
    (state: RootState) => state.conversation.conversations
  ).find((x) => x.id == idConversation);

  useEffect(() => {
    if (conversation !== undefined) {
      // dispatch(fetchMessagesThunk(idConversation));
      const reciptPerson = showDisplayUser(conversation!, user!);
      console.log("reciptPerson: ", reciptPerson);
      setRecipient(reciptPerson);
    }
  }, [conversation]);
  useEffect(() => {
    (async () => {
      if (conversation === undefined) {
        console.log("if statement");
        await dispatch(fetchConversationsThunk());
      }
      if (!conversation?.messages) dispatch(fetchMessagesThunk(idConversation));
    })();
  }, [id]);

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
