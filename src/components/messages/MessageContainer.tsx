import { formatRelative } from "date-fns";
import { FC, useContext, useEffect } from "react";
import { getConversationMessages } from "../../utils/api";
import { AuthContext } from "../../utils/context/AuthContext";
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainerStyle,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../utils/styles";
import { Message, User } from "../../utils/types/types";

type Props = {
  message: Message[];
};

export const MessageContainer: FC<Props> = ({ message }) => {
  const { user } = useContext(AuthContext);

  const formatMessage = (messages: Message[]) => {
    return messages.map((m: Message, i: number) => {
      const prevIndex = i !== message.length - 1 ? i + 1 : i;
      const prevMess = messages[prevIndex];
      if (m.author.id !== prevMess.author.id || i === message.length - 1)
        return (
          <MessageItemContainerStyle
            className={user?.id === m.author.id ? "author" : "recipient"}
          >
            <MessageItemAvatar />
            <MessageItemDetails>
              <MessageItemHeader>
                <span className="name">
                  {m.author.firstName} {m.author.lastName}
                </span>
              </MessageItemHeader>
              <MessageItemContent>
                <span>{m.content}</span>
                <span className="time">
                  {formatRelative(new Date(m.createdAt), new Date())}
                </span>
              </MessageItemContent>
            </MessageItemDetails>
          </MessageItemContainerStyle>
        );
      else
        return (
          <MessageItemContainerStyle className="noDetail">
            <MessageItemContent>
              <span>{m.content}</span>
              <span className="time">
                {formatRelative(new Date(m.createdAt), new Date())}
              </span>
            </MessageItemContent>
          </MessageItemContainerStyle>
        );
    });
  };

  return (
    <MessageContainerStyle>{formatMessage(message)}</MessageContainerStyle>
  );
};
