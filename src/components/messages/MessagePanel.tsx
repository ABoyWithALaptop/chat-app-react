import { FC } from "react";
import { MessagePanelStyle } from "../../utils/styles";
import { Message } from "../../utils/types/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";

type Props = {
  message: Message[];
};

export const MessagePanel: FC<Props> = ({ message }) => {
  return (
    <MessagePanelStyle>
      <MessageContainer message={message} />
      <MessageInputField />
    </MessagePanelStyle>
  );
};
