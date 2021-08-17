import io from 'socket.io-client';

export const socket = io();

export type SocketType = ReturnType<typeof io>;
