import React, { FC, useState } from "react";
import { useParams } from "react-router";
import { postMessage } from "../../utils/api";
import {
  MessageInputContainerStyle,
  MessageInputFieldStyle,
} from "../../utils/styles";
import styles from "./messageContainer.module.scss";

// type props = {
//   content: string;
//   setContent: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: (mess: React.FormEvent<HTMLFormElement>) => void;
// };

export const MessageInputField: FC = () => {
  const [content, setContent] = useState("");
  const { id } = useParams()!;
  const idNumber = parseInt(id!);
  const sendMessage = async (mess: React.FormEvent<HTMLFormElement>) => {
    console.log("send message");
    mess.preventDefault();
    if (!id || !content) throw new Error("Missing id or content");
    const conversationId = idNumber;
    try {
      console.log("try");
      await postMessage({ conversationId, content: content });
      setContent("");
    } catch (error) {
      console.log("error on sending message: ", error);
    }
  };
  return (
    <MessageInputContainerStyle>
      <form onSubmit={sendMessage} className={styles.inputForm}>
        <MessageInputFieldStyle
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </MessageInputContainerStyle>
  );
};
