import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { MessageType } from '../../AppTypes';
// Define a type for the slice state
interface ChatState {
  rooms: string[] | [];
  userMessages: MessageType | null;
  otherUserMessages: MessageType | null;
}

// Define the initial state using that type
const initialState: ChatState = {
  rooms: [],
  userMessages: null,
  otherUserMessages: null,
};

export const counterSlice = createSlice({
  name: 'chat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setRooms: (state, action: PayloadAction<string>) => {
      state.rooms = [...state.rooms, action.payload];
    },
    setUserMessages: (state, action: PayloadAction<MessageType>) => {
      state.userMessages = action.payload;
    },
    setOtherUserMessages: (state, action: PayloadAction<MessageType>) => {
      state.otherUserMessages = action.payload;
    },
  },
});

export const { setRooms, setUserMessages, setOtherUserMessages } =
  counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChat = (state: RootState) => state;

export default counterSlice.reducer;
