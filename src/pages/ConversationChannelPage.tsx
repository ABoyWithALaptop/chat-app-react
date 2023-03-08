import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router";
import { showDisplayUser } from "../components/conversation/ConversationsSidebar";
import { MessagePanel } from "../components/messages/MessagePanel";
import { AppDispatch, RootState } from "../store";
import {
  addMessage,
  fetchConversationsThunk,
  fetchMessagesThunk,
} from "../store/conversationSlice";
import { getConversationMessages, getConversationsById } from "../utils/api";
import { SocketContext } from "../utils/context/SocketContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { Message, MessageEventPayload, User } from "../utils/types/types";

// const addMessage = (
//   setState: React.Dispatch<React.SetStateAction<Message[]>>,
//   message: Message
// ) => {
//   setState((prev) => [message, ...prev]);
// };

export const ConversationChannelPage = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const [recipient, setRecipient] = useState<User>();
  const idConversation = parseInt(id!);
  const conversation = useSelector(
    (state: RootState) => state.conversation.conversations
  ).find((x) => x.id == idConversation);
  const dispatch = useDispatch<AppDispatch>();
  console.log("rendering");

  useEffect(() => {
    (async () => {
      if (conversation === undefined) {
        console.log("if statement");
        await dispatch(fetchConversationsThunk());
      }
      dispatch(fetchMessagesThunk(idConversation));
    })();
  }, [id]);

  useEffect(() => {
    if (conversation !== undefined) {
      // dispatch(fetchMessagesThunk(idConversation));
      const reciptPerson = showDisplayUser(conversation!, user!);
      console.log("reciptPerson: ", reciptPerson);
      setRecipient(reciptPerson);
    }
  }, [conversation]);

  useEffect(() => {
    // console.log(socket);
    socket.on("connected", () => console.log("connected"));
    socket.on("onMessage", (payload: MessageEventPayload) => {
      console.log("Message received");
      const { conversation, ...message } = payload;
      // addMessage(setMessage, payload);
      dispatch(addMessage(payload));
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, []);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        // messages={messages ? messages : []}
        messages={conversation?.messages}
        recipient={recipient}
      ></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
