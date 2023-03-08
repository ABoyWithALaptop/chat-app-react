import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Conversation,
  MessagesFetchPayloadType,
  Message,
} from "../utils/types/types";
import { getConversationMessages, getConversations } from "../utils/api";

/**
 * Define a type for the slice state
 * * This conversations slice has an array represent for set of conversations from database which have id start from 1
 */

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async (thunkAPI) => {
    const { data } = await getConversations();
    console.log("data in thunk conversation", data);
    return data;
  }
);
export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    const { data } = await getConversationMessages(id);
    console.log("data in thunk messages", data);
    return data;
  }
);

/* Creating a slice of the state. */
export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("addMessage");
      const idConversation = action.payload.conversation.id;
      const indexCurConversation = state.conversations.findIndex(
        (x) => x.id == idConversation
      );
      const curConversation = state.conversations[indexCurConversation];
      if (curConversation) {
        curConversation.messages!.unshift(action.payload);
        curConversation.lastMessageSent = action.payload;
        state.conversations[indexCurConversation] = curConversation;
      } else {
        console.warn("cant not sending message right now, please try again");
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchConversationsThunk.fulfilled,
        (state, action: PayloadAction<Conversation[]>) => {
          console.log("action payload from fetch conversation", action.payload);
          if (state.conversations.length == action.payload.length) return;
          const messArr = state.conversations.map(
            (conversation) => conversation.messages
          );
          state.conversations = action.payload;
          if (messArr.length > 0) {
            state.conversations.forEach((conversation, index) => {
              conversation.messages = messArr[index];
            });
          }
        }
      )
      .addCase(
        fetchMessagesThunk.fulfilled,
        (state, action: PayloadAction<MessagesFetchPayloadType>) => {
          const { conversationId, messages } = action.payload;
          // const indexConversation = conversationId - 1;
          console.log("action payload from fetch messages", action.payload);
          const indexCurConversation = state.conversations.findIndex(
            (x) => x.id == conversationId
          );
          const curConversation = state.conversations[indexCurConversation];
          console.log("curConversation", curConversation);
          if (curConversation) {
            curConversation.messages = messages;
            state.conversations[indexCurConversation].messages = messages;
          } else {
            console.log("current conversation is not found", curConversation);
          }
          state.loading = true;
        }
      )
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

//* Action creators are generated for each case reducer function
export const { addConversation, addMessage } = conversationsSlice.actions;

export default conversationsSlice.reducer;
