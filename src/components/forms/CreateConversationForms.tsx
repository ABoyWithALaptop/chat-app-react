import { SyntheticEvent } from "react";
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
export const CreateConversationForm = () => {
  const { register, handleSubmit } = useForm<createConversationParams>();

  const onSubmit: SubmitHandler<createConversationParams> = (data) => {
    // e.preventDefault();
    console.log("submitted");
    console.log("data", data);
    console.log(typeof data.recipientId);
    createConversation(data);
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
