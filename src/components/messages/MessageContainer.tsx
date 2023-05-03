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

const MenuItem = (props: MenuItemProps) => (
  <MenuItemInner {...props} className={styles.dark_menu_item} />
);

const FormattedMessage: FC<FormattedProps> = ({ mess, css }) => {
  const [messageItSelf, setMessageItSelf] = useState<Message>({ ...mess });
  const [source, target] = useSingleton();
  const { id } = useParams();

  return (
    <MessageItemContent
      padding={css?.padding || "0"}
      direction={css?.direction}
    >
      <Tippy
        singleton={source}
        placement="right"
        theme="material"
        arrow={true}
        animation="fade"
      />
      <Tippy
        content={formatRelative(new Date(messageItSelf.createdAt), new Date())}
        singleton={target}
      >
        <span>{messageItSelf.content}</span>
      </Tippy>
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
            copyMsg(messageItSelf.content);
          }}
        >
          Copy
        </MenuItem>
        <MenuItem
          onClick={async () => {
            console.log("delete message", messageItSelf);
            const result = await deleteMsg({
              messageId: messageItSelf.id,
              conversationId: parseInt(id!),
            });

            if (result) {
              console.log("deleted and result", result);
              const temp = { ...messageItSelf };
              temp.content = "This message has been deleted";
              setMessageItSelf(temp);
            } else return;
          }}
        >
          Delete
        </MenuItem>
      </Menu>
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
