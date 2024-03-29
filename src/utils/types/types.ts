export type Conversation = {
	id: number;
	creator: User;
	recipient: User;
	lastMessageSent?: LastMessageSent;
	createdAt: string;
	messages?: Message[];
};

export type CreateUserParams = {
	email: string;
	firstName: string;
	lastName: string;
	passWord: string;
};

export type UserCredential = {
	email: string;
	password: string;
};

export type User = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
};
export type CommonMessage = {
	id: number;
	content: string;
	createdAt: string;
	author: User;
};
export type Message = CommonMessage & {
	conversation: Conversation;
};
export type LastMessageSent = CommonMessage;
export type createConversationParams = {
	recipientEmail: string;
	message: string;
};
export type MessageEventPayload = {
	id: number;
	createdAt: string;
	conversation: Conversation;
	author: User;
	content: string;
};

export type CreateMessageParams = {
	content: string;
	conversationId: number;
};
export type MessagesFetchPayloadType = {
	conversationId: number;
	messages: Message[];
};
export type deleteMessageParams = {
	conversationId: number;
	messageId: number;
};
