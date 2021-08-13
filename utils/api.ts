import axios from 'axios';
import { User } from '../AppTypes';

let configUrl = '';

if (process.env.NODE_ENV === 'development') {
  configUrl = '/api/';
}

export const createUser = async (user: User) => {
  const res = await axios.post('/api/user', user);
  return res;
};
