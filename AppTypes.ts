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
  label: string;
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
  password: string;
  uid: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
