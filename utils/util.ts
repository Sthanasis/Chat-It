import { NextApiRequest, NextApiResponse } from 'next';

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
  return uid1 > uid2 ? `${uid1}-${uid2}` : `${uid2}-${uid1}`;
};

export const converToDate = (dateString: Date) => {
  const dateToDisplay = `${new Date(dateString).getFullYear()}-${new Date(
    dateString
  ).getMonth()}-${new Date(dateString).getDate()}`;

  return dateToDisplay.split('-').reverse().join('-');
};

export const getTimeDifference = (date: Date) => {
  const diffMs = new Date().getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / 86400000); // days
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  const diffWeeks = Math.round(diffMs / (24 * 3600 * 1000 * 7));
  const diffMonths =
    new Date().getMonth() +
    12 * new Date().getFullYear() -
    (new Date(date).getMonth() + 12 * new Date(date).getFullYear());
  const diffYears = new Date().getFullYear() - new Date(date).getFullYear();
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  if (diffYears > 0) {
    return new Date(date).getTime();
  }
  if (diffMonths > 0) {
    return diffMonths + ' months ago';
  }
  if (diffWeeks > 0) {
    return diffWeeks + ' weeks ago';
  }
  if (diffDays > 0) {
    return diffDays + ' days ago';
  }
  if (diffHrs > 0) {
    return diffHrs + ' hours ago';
  }
  if (diffMins > 1) {
    return diffMins + ' mins ago';
  }
  return 'Now';
};

const isYesterday = (date: Date) => {
  const now = new Date();
  const day = new Date(date);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0, 0);
  if (now.getTime() === day.getTime()) {
    return true;
  } else {
    return false;
  }
};

export const getBirthday = (date: string) => {
  return new Date(date).toString().substring(4, 10);
};
