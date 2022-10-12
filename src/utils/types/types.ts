export type ConversationType = {
  id: number;
  name: string;
  lastMessage: string;
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
