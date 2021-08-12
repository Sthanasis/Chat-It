import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface ChatState {
  message: string;
  date: string;
}

// Define the initial state using that type
const initialState: ChatState = {
  message: '',
  date: new Date().toDateString(),
};

export const counterSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMessage: (state, action: PayloadAction<ChatState>) => {
      state = { ...action.payload };
    },
  },
});

export const { setMessage } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: RootState) => state;

export default counterSlice.reducer;
