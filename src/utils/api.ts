import axios, { AxiosRequestConfig } from "axios";
import {
  Conversation,
  CreateUserParams,
  User,
  UserCredential,
} from "./types/types";

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoging = async (data: UserCredential) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<Conversation[]>(`${API_URL}/conversations`, config);
