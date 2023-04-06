import React, { FC, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { updateUserTyping } from "../../store/typingStatusSlice";
import { postMessage } from "../../utils/api";
import { SocketContext } from "../../utils/context/SocketContext";
import {
  MessageInputContainerStyle,
  MessageInputFieldStyle,
} from "../../utils/styles";
import { User } from "../../utils/types/types";
import styles from "./messageContainer.module.scss";

// type props = {
//   content: string;
//   setContent: React.Dispatch<React.SetStateAction<string>>;
//   sendMessage: (mess: React.FormEvent<HTMLFormElement>) => void;
// };

type props = {
  username: string;
  class?: string;
};

const Typing: FC<props> = (props) => {
  return (
    <div key={props.username} className={props.class}>
      User {props.username} is typing...
    </div>
  );
};

export const MessageInputField: FC = () => {
  const [content, setContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();
  const socket = useContext(SocketContext);
  const { id } = useParams()!;
  const idNumber = parseInt(id!);
  const conversation = useSelector(
    (state: RootState) => state.typingStatus.conversationList
  ).find((x) => x.conversationId === idNumber);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on("userType", (user: User[] | null) => {
      if (user) {
        dispatch(
          updateUserTyping({ conversationId: idNumber, typingUsers: user })
        );
      }
      console.log("conversation", conversation);
      console.log("alo", user);
    });
    socket.on("userNotTyping", (user: User[]) => {
      const userStillType = [...user];
      console.log("user still type", userStillType);
      dispatch(
        updateUserTyping({
          conversationId: idNumber,
          typingUsers: userStillType,
        })
      );
    });
    return () => {
      socket.off("userType");
      socket.off("userNotTyping");
    };
  }, []);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    if (event.target.value.length > 0) {
      if (typingTimeout) clearTimeout(typingTimeout);
      const newTimeout = setTimeout(() => {
        console.log("not typing");
        socket.emit("notTyping", idNumber);
      }, 1000);
      setTypingTimeout(newTimeout);
      socket.emit("typing", idNumber);
    }
  };
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
    <>
      <MessageInputContainerStyle>
        <form onSubmit={sendMessage} className={styles.inputForm}>
          <MessageInputFieldStyle value={content} onChange={handleTyping} />
        </form>
      </MessageInputContainerStyle>
      {conversation?.typingUsers && conversation?.typingUsers.length > 0 ? (
        <Typing
          username={conversation!.typingUsers
            .map((user) => {
              console.log("users", user);
              return user.lastName;
            })
            .join(" and ")}
          class={styles.userTyping}
        />
      ) : null}
    </>
  );
};
