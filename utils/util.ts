import { NextApiRequest, NextApiResponse } from 'next';
import { UserDBSchema } from '../AppTypes';
import { useAppDispatch } from '../store/hooks';
import { setConnections } from '../store/reducers/userSlice';

export const generateUniqueUid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const catchAsync = (fn: Function) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    fn(req, res).catch((error: Error) =>
      res.status(401).json({ err: error.message })
    );
  };
};

export const hasLocalStorage = () => {
  return typeof localStorage !== 'undefined' && localStorage.getItem('user');
};

export const combineUserUids = (uid1: string, uid2: string) => {
  return uid1 > uid2 ? uid1 + uid2 : uid2 + uid1;
};
