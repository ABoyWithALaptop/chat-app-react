import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, conversationDetail } from "../utils/types/types";
import { getConversations } from "../utils/api";

export interface ConversationState {
  conversations: Map<number, Conversation>;
}

const initialState: ConversationState = {
  conversations: new Map<number, Conversation>(),
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async (thunkAPI) => {
    const { data } = await getConversations();
    console.log("data in thunk conversation", data);
    return data;
  }
);

/* Creating a slice of the state. */
export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation");
      console.log("action payload from addConversation", action.payload);
      state.conversations.set(action.payload.id, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchConversationsThunk.fulfilled,
      (state, action: PayloadAction<Conversation[]>) => {
        console.log("action payload from fetch conversation", action.payload);
        const map = new Map<number, Conversation>(
          action.payload.map((obj) => [obj.id, obj])
        );
        state.conversations = map;
      }
    );
  },
});

//* Action creators are generated for each case reducer function
export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
