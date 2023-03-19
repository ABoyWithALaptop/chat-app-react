import { createRef, FC, PropsWithChildren, useEffect, useRef } from "react";
import { ModalContainer, ModalContentBody, ModelHeader } from ".";
import { OverlayStyle } from "../../utils/styles";
import { CreateConversationForm } from "../forms/CreateConversationForms";
import { MdClose } from "react-icons/md";
import styles from "./index.module.scss";

type Props = {
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: FC<Props> = ({ setShowModel }) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.key == "Escape" && setShowModel(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (ref.current === e.target) {
      setShowModel(false);
    }
  };
  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModelHeader>
          <h2>Create a conversation</h2>
          <MdClose
            onClick={() => setShowModel(false)}
            className={styles.closeBtn}
          />
        </ModelHeader>
        <ModalContentBody>
          <CreateConversationForm setShowModel={setShowModel} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
