import { FC, useState } from "react";
import { useParams } from "react-router";
import { MessagePanelBodyStyle, MessagePanelStyle } from "../../utils/styles";
import { Message, User } from "../../utils/types/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { postMessage } from "../../utils/api";

type Props = {
  messages: Message[];
  recipient: User;
};

export const MessagePanel: FC<Props> = ({ messages, recipient }) => {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const sendMessage = async (mess: React.FormEvent<HTMLFormElement>) => {
    mess.preventDefault();
    if (!id || !content) throw new Error("Missing id or content");
    const conversationId = parseInt(id!);
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
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
        />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
