import React, { ReactNode } from 'react';

export interface MessageType {
  messages: string[] | [];
  userId: string;
  username: string;
  isTyping: boolean;
  date: string;
}

export interface ButtonPropsType {
  type: string;
  onClick: () => void;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface InputPropsType {
  inputType?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (v: string) => void;
  value: string;
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  options?: string[];
  style?: React.CSSProperties;
  name?: string;
}

export interface User {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  uid: string;
  connectedTo: string[];
}

export interface UserInputData {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  uid: string;
}

export interface UserDBSchema {
  username: string;
  firstname: string;
  gender: string;
  lastname: string;
  age: string;
  email: string;
  password: string;
  uid: string;
  active: boolean;
  connectedTo: string[];
}

export interface UserStatus {
  uid: string;
  active: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Room {
  id: string;
  name: string;
  senderUid: string;
  receiverUid: string;
  collapsed: boolean;
  messages: Message[];
  index?: number;
}

export interface Message {
  uid: string | undefined;
  message: string;
  date: string;
}
