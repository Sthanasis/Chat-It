import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserDBSchema } from '../../AppTypes';
import { hasLocalStorage } from '../../utils/util';
import type { RootState } from '../store';

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  connections: UserDBSchema[] | [];
}

const initialState: UserState = {
  isLoggedIn: hasLocalStorage() ? true : false,
  user:
    (hasLocalStorage() && JSON.parse(localStorage.getItem('user') || '{}')) ||
    null,
  token:
    (hasLocalStorage() && JSON.parse(localStorage.getItem('token') || '{}')) ||
    null,
  connections:
    (hasLocalStorage() &&
      JSON.parse(localStorage.getItem('connections') || '{}')) ||
    [],
};

export const UserSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setConnections: (state, action: PayloadAction<UserDBSchema[]>) => {
      localStorage.setItem('connections', JSON.stringify(action.payload));
      state.connections = action.payload;
    },
  },
});

export const { setIsAuth, setUser, setToken, setConnections } =
  UserSlice.actions;
export const selectState = (state: RootState) => state;

export default UserSlice.reducer;
