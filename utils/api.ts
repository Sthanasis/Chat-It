import axios from 'axios';
import { Message, UserCredentials, UserDBSchema } from '../AppTypes';

let configUrl = '';

if (process.env.NODE_ENV === 'development') {
  configUrl = '/api';
}

export const signupUser = async (user: UserDBSchema) => {
  const res = await axios.post(`${configUrl}/auth/?login=false`, user);
  return res;
};

export const authenticate = async (user: UserCredentials) => {
  const res = await axios.post(`${configUrl}/auth/?login=true`, user);
  return res;
};

export const getUser = async (uid: string) => {
  //TODO change email to uid
  const res = await axios.post(`${configUrl}/users/`, { uid });
  return res;
};

export const getConnections = async (uids: string[]) => {
  const res = await axios.get(`${configUrl}/users/?uids=${uids}`);
  return res;
};

export const updateUserStatus = async (uid: string, active: boolean) => {
  const res = await axios.patch(`${configUrl}/users/`, { uid, active });
  return res;
};

export const connectToUser = async (uid: string | undefined, uid2: string) => {
  try {
    const res = await axios.put(`${configUrl}/connect/`, { uid, uid2 });
    return res;
  } catch (err) {
    console.log({ err });
  }
};

export const getChat = async (roomId: string, limit: Number) => {
  try {
    const res = await axios.get(
      `${configUrl}/chat/?roomId=${roomId}&limit=${limit}`
    );
    return res;
  } catch (err) {
    console.log({ err });
  }
};

export const postChat = async (roomId: string, message: Message) => {
  try {
    const res = await axios.post(`${configUrl}/chat/`, { roomId, message });
    return res;
  } catch (err) {
    console.log({ err });
  }
};

export const signOutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('connections');
  localStorage.removeItem('token');
};

export const searchUser = async (search: string) => {
  try {
    const res = await axios.get(`${configUrl}/users/?search=${search}`);
    console.log(res);
  } catch (err) {
    console.error({ err });
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${configUrl}/users/`);
    console.log(res);
  } catch (err) {
    console.error({ err });
  }
};
