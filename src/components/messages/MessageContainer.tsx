import { formatRelative } from "date-fns";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
  messages: Message[];
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

export const MessageContainer: FC<Props> = ({ messages }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);

  /* A function that takes in an array of messages and returns a new array of messages jsx elements. */
  const formatMessage = (messages: Message[]) => {
    return messages.map((m: Message, i: number) => {
      const prevIndex = i !== messages.length - 1 ? i + 1 : i;
      const prevMess = messages[prevIndex];
      if (m.author.id !== prevMess.author.id || i === messages.length - 1)
        return (
          <MessageItemContainerStyle
            className={
              user?.id === m.author.id ? styles.author : styles.recipient
            }
            key={m.id}
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
            key={m.id}
          >
            <FormattedMessage mess={m} />
          </MessageItemContainerStyle>
        );
    });
  };

  return (
    <MessageContainerStyle>{formatMessage(messages)}</MessageContainerStyle>
  );
};
