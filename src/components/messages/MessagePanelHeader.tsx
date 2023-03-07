import { FC } from "react";
import { MessagePanelHeaderStyle } from "../../utils/styles";
import { Conversation, User } from "../../utils/types/types";

type props = {
  recipient?: User;
};

export const MessagePanelHeader: FC<props> = ({ recipient }) => {
  return (
    <MessagePanelHeaderStyle>
      {recipient ? `${recipient?.lastName} ${recipient?.firstName}` : ""}
    </MessagePanelHeaderStyle>
  );
};
