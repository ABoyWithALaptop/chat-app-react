import { FC } from "react";
import { MessagePanelBodyStyle, MessagePanelStyle } from "../../utils/styles";
import { Message, User } from "../../utils/types/types";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessagePanelHeader } from "./MessagePanelHeader";

type Props = {
  message: Message[];
  recipient: User;
};

export const MessagePanel: FC<Props> = ({ message, recipient }) => {
  return (
    <MessagePanelStyle>
      <MessagePanelHeader recipient={recipient}></MessagePanelHeader>
      <MessagePanelBodyStyle>
        <MessageContainer message={message} />
        <MessageInputField />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
