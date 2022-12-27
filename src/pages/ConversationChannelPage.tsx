import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MessageContainer } from "../components/messages/MessageContainer";
import { MessagePanel } from "../components/messages/MessagePanel";
import { MessagePanelHeader } from "../components/messages/MessagePanelHeader";
import { getConversationMessages, getConversationsById } from "../utils/api";
import { AuthContext } from "../utils/context/AuthContext";
import { ConversationChannelPageStyle } from "../utils/styles";
import { Message, User } from "../utils/types/types";

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [message, setMessage] = useState<Message[]>([]);
  const [recipient, setRecipient] = useState<User>();
  useEffect(() => {
    console.log(id);
    getConversationMessages(parseInt(id!)).then(({ data }) => {
      console.log(data);
      setMessage(data);
      console.log("data", data[0].content);
    });
    getConversationsById(parseInt(id!)).then(({ data }) => {
      console.log(data);
      setRecipient(data.recipient);
    });
  }, [id]);
  return (
    <ConversationChannelPageStyle>
      <MessagePanelHeader recipient={recipient}></MessagePanelHeader>
      <MessagePanel message={message}></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
