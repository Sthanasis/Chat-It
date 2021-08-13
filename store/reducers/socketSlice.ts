import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { SocketType, socket } from '../../utils/sockets';

interface SocketState {
  socket: SocketType;
}

const initialState: SocketState = {
  socket: socket,
};

export const SocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<string>) => {
      if (action.payload === 'open') {
        state.socket.open();
      } else {
        state.socket.close();
      }
    },
  },
});

export const { setSocket } = SocketSlice.actions;
export const selectState = (state: RootState) => state;

export default SocketSlice.reducer;
