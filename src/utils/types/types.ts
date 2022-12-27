export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  lastMessageSent: Message;
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
  createdAt: number;
  author: User;
  conversation: Conversation;
};
export type createConversationParams = {
  recipientId: number;
  message: string;
};
