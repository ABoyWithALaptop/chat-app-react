import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Conversation,
  MessagesFetchPayloadType,
  Message,
  createConversationParams,
} from "../utils/types/types";
import {
  createConversation,
  getConversationMessages,
  getConversations,
} from "../utils/api";
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
const updatedLastMessageSentAndConversation = (
  state: any,
  conversationId: number,
  message: Message
) => {
  const indexCurConversation = state.conversations.findIndex(
    (x: any) => x.id === conversationId
  );
  const curConversation = state.conversations[indexCurConversation];
  if (curConversation) {
    curConversation.lastMessageSent = message;
    return curConversation;
  } else return null;
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
export const createConversationThunk = createAsyncThunk(
  "conversation/create",
  async (params: createConversationParams) => {
    const { data } = await createConversation(params);
    console.log("data in thunk create conversation", data);
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
      console.log("addConversation", action);
      const curConversations = [...state.conversations];
      curConversations.unshift(action.payload);
      state.conversations = [...curConversations];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("addMessage", action);
      const { id: idConversation } = action.payload.conversation;
      const curConversation = updatedLastMessageSentAndConversation(
        state,
        idConversation,
        action.payload
      );
      if (curConversation) {
        curConversation.messages?.unshift(action.payload);
        const newConversations = state.conversations.filter(
          (x) => x.id !== idConversation
        );
        newConversations.unshift(curConversation);
        state.conversations = newConversations;
      } else {
        console.warn("cant not sending message right now, please try again");
      }
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("updateConversation", action.payload);
      const { id, lastMessageSent } = action.payload;
      const current = updatedLastMessageSentAndConversation(
        state,
        id,
        lastMessageSent!
      );
      if (current) {
        const newConversations = state.conversations.filter((x) => x.id !== id);
        newConversations.unshift(current);
        state.conversations = newConversations;
      } else {
        console.error(
          "cant not update conversation right now, please try again"
        );
      }
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      console.log("updateMessage", action.payload);
      const indexOfConversation = state.conversations.findIndex((x) => {
        return x.id === action.payload.conversation.id;
      });
      const temp = state.conversations[indexOfConversation].messages!;
      action.payload.content = "This message has been deleted";
      const index = temp.findIndex((x) => x.id === action.payload.id);
      temp[index] = action.payload;
      state.conversations[action.payload.conversation.id - 1].messages = [
        ...temp,
      ];
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
      })
      .addCase(
        createConversationThunk.fulfilled,
        (state, action: PayloadAction<Conversation>) => {
          const temp = [action.payload, ...state.conversations];
          state.conversations = [...temp];
        }
      );
  },
});

//* Action creators are generated for each case reducer function
export const { addConversation, addMessage, updateMessage } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
