import {
	createAsyncThunk,
	createDraftSafeSelector,
	createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import rfdc from "rfdc";
import {
	Conversation,
	MessagesFetchPayloadType,
	Message,
	createConversationParams,
	LastMessageSent,
} from "../utils/types/types";
import {
	createConversation,
	getConversationMessages,
	getConversations,
} from "../utils/api";
import { AppDispatch, RootState } from ".";
import {
	addConversationToTypingStatus,
	initialConversation,
} from "./typingStatusSlice";
import { act } from "react-dom/test-utils";

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
	message: LastMessageSent
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
	async (params: createConversationParams, thunkAPI) => {
		const { data } = await createConversation(params);
		console.log("data in thunk create conversation", data);
		thunkAPI.dispatch(addConversationToTypingStatus(data));
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
			const cloneDeep = rfdc();
			console.log("updateMessage", action.payload);
			const indexOfConversation = state.conversations.findIndex((x) => {
				return x.id === action.payload.conversation.id;
			});
			console.log("index of conversation", indexOfConversation);
			const currentConversations = cloneDeep(state.conversations);
			const temp = currentConversations[indexOfConversation].messages!;
			console.log("temp", temp);
			action.payload.content = "This message has been deleted";
			const index = temp.findIndex((x) => x.id === action.payload.id);
			temp[index] = action.payload;
			if (
				currentConversations[indexOfConversation].lastMessageSent?.id ===
				action.payload.id
			) {
				const { conversation, ...message } = action.payload;
				currentConversations[indexOfConversation].lastMessageSent = message;
			}
			// currentConversations[indexOfConversation] = action.payload.conversation;
			currentConversations[indexOfConversation].messages = [...temp];
			state.conversations = currentConversations;

			// state.conversations = clone;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				fetchConversationsThunk.fulfilled,
				(state, action: PayloadAction<Conversation[]>) => {
					state.loading = true;
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
					state.loading = false;
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
					state.fetching = false;
					const temp = [action.payload, ...state.conversations];
					state.conversations = [...temp];
					state.fetching = true;
				}
			);
	},
});

export const selectConversations = (state: RootState) => state.conversation;

export const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationById = createDraftSafeSelector(
	[selectConversations, selectConversationId],
	(state, id) => {
		return state.conversations.find((x) => x.id === id);
	}
);

//* Action creators are generated for each case reducer function
export const { addConversation, addMessage, updateMessage } =
	conversationsSlice.actions;

export default conversationsSlice.reducer;
