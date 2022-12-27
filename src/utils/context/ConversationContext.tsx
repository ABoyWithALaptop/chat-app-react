import { createContext } from "react";
import { Conversation } from "../types/types";

type ConversationContextType = {
  conversation?: Conversation;
  updateConversation: (data: Conversation) => void;
};

export const ConversationContext = createContext<ConversationContextType>({
  updateConversation: () => {},
});
