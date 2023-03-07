import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MessagePanelBodyStyle, MessagePanelStyle } from "../../utils/styles";
import { Message, User } from "../../utils/types/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { postMessage } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchMessagesThunk } from "../../store/conversationSlice";

type Props = {
  messages?: Message[];
  recipient?: User;
};

export const MessagePanel: FC<Props> = ({ messages, recipient }) => {
  if (!messages) messages = [];
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // const message = useSelector(
  //   (state: RootState) => state.conversation.conversations
  // );
  const { id } = useParams();
  const idNumber = parseInt(id!);
  const sendMessage = async (mess: React.FormEvent<HTMLFormElement>) => {
    mess.preventDefault();
    if (!id || !content) throw new Error("Missing id or content");
    const conversationId = idNumber;
    try {
      await postMessage({ conversationId, content: content });
      setContent("");
    } catch (error) {
      console.log("error on sending message: ", error);
    }
  };
  return (
    <MessagePanelStyle>
      <MessagePanelHeader recipient={recipient}></MessagePanelHeader>
      <MessagePanelBodyStyle>
        <MessageContainer messages={messages} />
        <MessageInputField />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
