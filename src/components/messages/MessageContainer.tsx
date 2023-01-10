import { formatRelative } from "date-fns";
import { FC, useContext, useEffect, useState } from "react";
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
import styles from "./messageContainer.module.scss";

type Props = {
  message: Message[];
};
type FormattedProps = {
  mess: Message;
  css?: {
    padding?: string;
    direction?: string;
  };
};

const FormattedMessage: FC<FormattedProps> = ({ mess, css }) => {
  const [showTime, setShowTime] = useState(false);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    let time: any;
    if (hovering) time = setTimeout(() => setShowTime(true), 500);
    else setShowTime(false);
    return () => clearInterval(time);
  }, [hovering]);

  return (
    <MessageItemContent
      padding={css?.padding || "0"}
      direction={css?.direction}
    >
      <span
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {mess.content}
      </span>
      <span className={`${styles.time} ${showTime ? styles.showNoti : ""}`}>
        {formatRelative(new Date(mess.createdAt), new Date())}
      </span>
    </MessageItemContent>
  );
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
            className={
              user?.id === m.author.id ? styles.author : styles.recipient
            }
          >
            <MessageItemAvatar />
            <MessageItemDetails>
              <MessageItemHeader>
                <span className={styles.name}>
                  {m.author.firstName} {m.author.lastName}
                </span>
              </MessageItemHeader>
              <FormattedMessage
                css={{ padding: "10px 0px 0px 0px" }}
                mess={m}
              ></FormattedMessage>
            </MessageItemDetails>
          </MessageItemContainerStyle>
        );
      else
        return (
          <MessageItemContainerStyle
            className={`${styles.noDetail} ${
              user?.id === m.author.id ? styles.author : styles.recipient
            }`}
          >
            <FormattedMessage mess={m} />
          </MessageItemContainerStyle>
        );
    });
  };

  return (
    <MessageContainerStyle>{formatMessage(message)}</MessageContainerStyle>
  );
};
