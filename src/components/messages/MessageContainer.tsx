import { formatRelative } from "date-fns";
import { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  MessageContainerStyle,
  MessageItemAvatar,
  MessageItemContainerStyle,
  MessageItemContent,
  MessageItemDetails,
  MessageItemHeader,
} from "../../utils/styles";
import { Message, User, deleteMessageParams } from "../../utils/types/types";
import styles from "./messageContainer.module.scss";
import {
  Menu,
  MenuItem as MenuItemInner,
  MenuButton,
  MenuItemProps,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import Tippy, { useSingleton } from "@tippyjs/react";
import "tippy.js/themes/material.css";
import "tippy.js/dist/tippy.css";
import { Icons } from "../../utils/images/icons/more";
import { deleteMessageById } from "../../utils/api";
import { useParams } from "react-router";
import {
  selectConversationById,
  updateMessage,
} from "../../store/conversationSlice";
import { SocketContext } from "../../utils/context/SocketContext";

type Props = {
  messages: Message[];
};
type FormattedProps = {
  mess: Message;
  modified: boolean;
  css?: {
    padding?: string;
    direction?: string;
  };
};

const MenuItem = (props: MenuItemProps) => (
  <MenuItemInner {...props} className={styles.dark_menu_item} />
);

const FormattedMessage: FC<FormattedProps> = ({ mess, css, modified }) => {
  const [source, target] = useSingleton();
  const { id } = useParams();

  return (
    <MessageItemContent
      padding={css?.padding || "0"}
      direction={css?.direction}
      className={modified ? styles.modified : ""}
    >
      <Tippy
        singleton={source}
        placement="right"
        theme="material"
        arrow={true}
        animation="fade"
      />
      <Tippy
        content={formatRelative(new Date(mess.createdAt), new Date())}
        singleton={target}
      >
        <span>{mess.content}</span>
      </Tippy>
      {!modified && (
        <Menu
          menuButton={({ open }) =>
            open ? (
              <MenuButton
                className={`${styles.menu_button} ${styles.clicked_button}`}
              >
                <Icons />
              </MenuButton>
            ) : (
              <MenuButton className={`${styles.menu_button} `}>
                <Icons />
              </MenuButton>
            )
          }
          transition
          // arrow
          menuClassName={`${styles.dark_menu}`}
          // theming="dark"
        >
          <MenuItem
            onClick={() => {
              copyMsg(mess.content);
            }}
          >
            Copy
          </MenuItem>
          <MenuItem
            onClick={async () => {
              console.log("delete message", mess);
              const result = await deleteMsg({
                messageId: mess.id,
                conversationId: parseInt(id!),
              });
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      )}
    </MessageItemContent>
  );
};

export const MessageContainer: FC<Props> = ({ messages }) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    socket.on("onMessageDelete", (payload: Message) => {
      console.log("onMessageDelete received", payload);
      dispatch(updateMessage(payload));
      setModifiedMessagesId((prev) => [...prev, payload.id]);
    });
    return () => {
      socket.off("onMessageDelete");
    };
  }, []);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [modifiedMessagesId, setModifiedMessagesId] = useState<number[]>([]);
  console.log("messages state", messages);
  /* A function that takes in an array of messages and returns a new array of messages jsx elements. */
  const formatMessage = (messages: Message[]) => {
    console.log("messages", messages);
    return messages.map((m: Message, i: number) => {
      const prevIndex = i !== messages.length - 1 ? i + 1 : i;
      const modified = modifiedMessagesId.includes(m.id);
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
                modified={modified}
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
            <FormattedMessage mess={m} modified={modified} />
          </MessageItemContainerStyle>
        );
    });
  };

  return (
    <MessageContainerStyle>{formatMessage(messages)}</MessageContainerStyle>
  );
};

// function to copy message to clipboard
const copyMsg = async (msg: string) => {
  try {
    await navigator.clipboard.writeText(msg);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
// function to delete message
const deleteMsg = async (params: deleteMessageParams) => {
  try {
    const { status } = await deleteMessageById(params);
    if (status === 200) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};
