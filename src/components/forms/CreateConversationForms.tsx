import { FC, SyntheticEvent, useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createConversation, getAllAvailableUsers } from "../../utils/api";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextFieldStyle,
} from "../../utils/styles";
import { User, createConversationParams } from "../../utils/types/types";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createConversationThunk } from "../../store/conversationSlice";
import { SearchDropdown } from "./searchDropdown";

type conversationCreateFormField = {
  recipientEmail: string;
  message: string;
};
type props = {
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CreateConversationForm: FC<props> = ({ setShowModel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<conversationCreateFormField>();
  const dispatch = useDispatch<AppDispatch>();

  const [listAvailableUsers, setListAvailableUsers] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    getAllAvailableUsers().then(({ data }) => {
      const formatArray = data.map((user) => ({
        value: user.email,
        label: user.email,
      }));
      console.log("format array", formatArray);
      setListAvailableUsers(formatArray);
    });
  }, []);

  const onSubmit: SubmitHandler<conversationCreateFormField> = async (data) => {
    // e.preventDefault();
    try {
      console.log("submitted");
      console.log("data", data);
      console.log(typeof data.recipientEmail);
      const requestParams: createConversationParams = {
        recipientEmail: data.recipientEmail,
        message: data.message,
      };
      console.log("request params", requestParams);
      dispatch(createConversationThunk(requestParams));

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
        <Controller
          control={control}
          name="recipientEmail"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <SearchDropdown options={listAvailableUsers} {...field} />
          )}
        />
      </section>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextFieldStyle {...register("message")} />
        </InputContainer>
      </section>
      <Button type="submit">Create Conversations</Button>
    </form>
  );
};
