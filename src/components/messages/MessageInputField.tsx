import React, { FC } from "react";
import {
  MessageInputContainerStyle,
  MessageInputFieldStyle,
} from "../../utils/styles";

type props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (mess: React.FormEvent<HTMLFormElement>) => void;
};

export const MessageInputField: FC<props> = ({
  content,
  setContent,
  sendMessage,
}) => {
  return (
    <MessageInputContainerStyle>
      <form onSubmit={sendMessage}>
        <MessageInputFieldStyle
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </MessageInputContainerStyle>
  );
};
