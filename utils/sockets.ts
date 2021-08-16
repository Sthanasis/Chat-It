import io from 'socket.io-client';
import { socketPort } from '../config';

export const socket = io();

export type SocketType = ReturnType<typeof io>;
