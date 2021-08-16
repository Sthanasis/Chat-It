import axios from 'axios';
import { User, UserCredentials } from '../AppTypes';

let configUrl = '';

if (process.env.NODE_ENV === 'development') {
  configUrl = '/api';
}

export const signupUser = async (user: User) => {
  const res = await axios.post(`/api/auth/?login=false`, user);
  return res;
};

export const authenticate = async (user: UserCredentials) => {
  const res = await axios.post(`/api/auth/?login=true`, user);
  return res;
};

export const getUser = async (uid: string) => {
  //TODO change email to uid
  const res = await axios.get(`${configUrl}/users?email=${uid}`);
  return res;
};
