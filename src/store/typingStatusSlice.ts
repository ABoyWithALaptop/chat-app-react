import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, User } from "../utils/types/types";

export interface conversationTypingStatus {
  conversationId: number;
  typingUsers: User[];
}

export interface TypingState {
  conversationList: conversationTypingStatus[];
}
const initialState: TypingState = {
  conversationList: [],
};
/* Creating a slice of the state. */
export const typingStatus = createSlice({
  name: "typingStatus",
  initialState,
  reducers: {
    updateUserTyping: (
      state,
      action: PayloadAction<conversationTypingStatus>
    ) => {
      let curStatus = [...state.conversationList];
      curStatus.forEach((conversation) => {
        if (conversation.conversationId === action.payload.conversationId) {
          conversation.typingUsers = [...action.payload.typingUsers];
        }
      });
      state.conversationList = [...curStatus];
    },
    initialConversation(state, action: PayloadAction<Conversation[]>) {
      const list = action.payload.map((conversation) => {
        return { conversationId: conversation.id, typingUsers: [] };
      });
      state.conversationList = [...list];
    },
  },
});

//* Action creators are generated for each case reducer function
export const { updateUserTyping, initialConversation } = typingStatus.actions;

export default typingStatus.reducer;
