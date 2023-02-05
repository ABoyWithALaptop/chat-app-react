import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { conversationDetail } from "../utils/types/types";

export interface ConversationState {
  conversations: conversationDetail[];
}

const initialState: ConversationState = {
  conversations: [],
};

/* Creating a slice of the state. */
export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<conversationDetail>) => {
      console.log("addConversation");
      state.conversations.push(action.payload);
    },
  },
});

//* Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
