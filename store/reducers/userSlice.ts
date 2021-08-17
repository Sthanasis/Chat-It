import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../AppTypes';
import { hasLocalStorage } from '../../utils/util';
import type { RootState } from '../store';

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  friends: User['connectedTo'];
}

const initialState: UserState = {
  isLoggedIn: hasLocalStorage() ? true : false,
  user:
    (hasLocalStorage() && JSON.parse(localStorage.getItem('user') || '{}')) ||
    null,
  token:
    (hasLocalStorage() && JSON.parse(localStorage.getItem('token') || '{}')) ||
    null,
  friends: [],
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
    setFriends: (state, action: PayloadAction<string[]>) => {
      state.friends = action.payload;
    },
  },
});

export const { setIsAuth, setUser, setToken, setFriends } = UserSlice.actions;
export const selectState = (state: RootState) => state;

export default UserSlice.reducer;
