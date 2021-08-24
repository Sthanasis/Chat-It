import { io } from 'socket.io-client';

export const socket = io({
  autoConnect: false,
});

export type SocketType = ReturnType<typeof io>;
