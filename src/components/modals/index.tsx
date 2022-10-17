import { FC, PropsWithChildren } from "react";
import {
  ModalContainerStyle,
  ModalContentBodyStyle,
  ModalHeaderStyle,
  OverlayStyle,
} from "../../utils/styles";
import { CreateConversationForm } from "../forms/CreateConversationForms";

export const ModelHeader: FC<PropsWithChildren> = ({ children }) => {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
};

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
  return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
};

export const ModalContainer: FC<PropsWithChildren> = ({ children }) => {
  return <ModalContainerStyle>{children}</ModalContainerStyle>;
};
