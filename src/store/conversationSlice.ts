import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Conversation,
  MessagesFetchPayloadType,
  Message,
} from "../utils/types/types";
import { getConversationMessages, getConversations } from "../utils/api";
import { AppDispatch, RootState } from ".";
import { initialConversation } from "./typingStatusSlice";

/**
 * Define a type for the slice state
 * * This conversations slice has an array represent for set of conversations from database which have id start from 1
 */

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  fetching: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  fetching: false,
};

export const fetchConversationsThunk = createAsyncThunk<Conversation[]>(
  "conversations/fetch",
  async (_, thunkAPI) => {
    const { data } = await getConversations();
    console.log("data in thunk conversation", data);
    thunkAPI.dispatch(initialConversation(data));
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
const compareTimeCreated = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
};
const sortConversationByLastModified = (conversations: Conversation[]) => {
  conversations.sort((a, b) => {
    const timeA = a.lastMessageSent?.createdAt || a.createdAt;
    const timeB = b.lastMessageSent?.createdAt || b.createdAt;
    const sorted = compareTimeCreated(timeA, timeB);
    return sorted;
  });
  return conversations;
};
/* Creating a slice of the state. */
export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation", action);
      const curConversations = [...state.conversations];
      curConversations.unshift(action.payload);
      state.conversations = [...curConversations];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("addMessage", action);
      const idConversation = action.payload.conversation.id;
      const indexCurConversation = state.conversations.findIndex(
        (x) => x.id === idConversation
      );
      const curConversation = state.conversations[indexCurConversation];
      if (curConversation) {
        curConversation.messages?.unshift(action.payload);
        curConversation.lastMessageSent = action.payload;
        const newConversations = state.conversations.filter(
          (x) => x.id !== idConversation
        );
        newConversations.unshift(curConversation);
        state.conversations = newConversations;
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
          const sorted = sortConversationByLastModified(state.conversations);
          console.log("sorted", sorted);
          state.conversations = sorted;
          state.fetching = true;
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
