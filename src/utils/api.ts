import axios, { AxiosRequestConfig } from "axios";
import {
  Conversation,
  createConversationParams,
  CreateMessageParams,
  CreateUserParams,
  User,
  UserCredential,
} from "./types/types";

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLogging = async (data: UserCredential) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = async () =>
  await axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (id: number) =>
  axios.get(`${API_URL}/messages/${id}`, config);

export const createConversation = (
  createConversationParam: createConversationParams
) => {
  return axios.post(
    `${API_URL}/messages/firstMessage`,
    createConversationParam,
    config
  );
};
export const getConversationsById = (id: number) => {
  return axios.get<Conversation>(`${API_URL}/conversations/${id}`, config);
};

export const postMessage = (postMessage: CreateMessageParams) => {
  return axios.post(`${API_URL}/messages`, { ...postMessage }, config);
};

// ? will add user info later for later now just get list of all users
export const getFriendList = (params?: any) => {
  return axios.post<User[]>(`${API_URL}/users/`, { ...params }, config);
};
