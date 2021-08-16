import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  uid: string | null;
  token: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  uid: null,
  token: null,
};

export const UserSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUsername, setUid, setToken } =
  UserSlice.actions;
export const selectState = (state: RootState) => state;

export default UserSlice.reducer;
