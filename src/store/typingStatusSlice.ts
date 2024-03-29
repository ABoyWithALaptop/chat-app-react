import { createDraftSafeSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, User } from "../utils/types/types";
import { RootState, store } from ".";

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
			console.log("updateUserTyping", action.payload);
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
		addConversationToTypingStatus: (
			state,
			action: PayloadAction<Conversation>
		) => {
			console.log("addConversation", action);
			const curConversations = [...state.conversationList];
			curConversations.unshift({
				conversationId: action.payload.id,
				typingUsers: [],
			});
			state.conversationList = [...curConversations];
		},
	},
});

//* Action creators are generated for each case reducer function
export const {
	updateUserTyping,
	initialConversation,
	addConversationToTypingStatus,
} = typingStatus.actions;

export default typingStatus.reducer;

export const selectConversations = (state: RootState) =>
	state.typingStatus.conversationList;

export const selectConversationId = (state: RootState, id: number) => id;

export const selectConversationTypingById = createDraftSafeSelector(
	[selectConversations, selectConversationId],
	(conversations, id) => {
		return conversations.find(
			(conversation) => conversation.conversationId === id
		);
	}
);
