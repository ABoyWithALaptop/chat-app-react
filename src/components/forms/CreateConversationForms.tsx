import { FC, SyntheticEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createConversation } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextFieldStyle,
} from "../../utils/styles";
import { createConversationParams } from "../../utils/types/types";
import styles from "./index.module.scss";
type conversationCreateFormField = {
  recipientId: string;
  message: string;
};
type props = {
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CreateConversationForm: FC<props> = ({ setShowModel }) => {
  const { register, handleSubmit } = useForm<conversationCreateFormField>();

  const onSubmit: SubmitHandler<conversationCreateFormField> = async (data) => {
    // e.preventDefault();
    try {
      console.log("submitted");
      console.log("data", data);
      console.log(typeof data.recipientId);
      const requestParams: createConversationParams = {
        recipientId: parseInt(data.recipientId),
        message: data.message,
      };
      await createConversation(requestParams);
      setShowModel(false);
    } catch (error) {
      console.log("error from create conversation form", error);
    }
  };
  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField {...register("recipientId")} />
        </InputContainer>
      </section>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextFieldStyle {...register("message")} />
        </InputContainer>
      </section>
      <Button
        type="submit"
        // onClick={(e) => {
        //   e.preventDefault();
        //   // createConversation();
        // }}
      >
        Create Conversations
      </Button>
    </form>
  );
};
