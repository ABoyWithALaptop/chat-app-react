export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  lastMessageSent: Message;
  createdAt: Date;
};
export type conversationDetail = {
  id: number;
  creator: User;
  recipient: User;
  message: Message[];
  lastMessageSent: Message;
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
export type Message = {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
  conversation: Conversation;
};
export type createConversationParams = {
  recipientId: number;
  message: string;
};
export type MessageEventPayload = {
  id: number;
  createdAt: Date;
  conversation: Conversation;
  author: User;
  content: string;
};
