import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chatSlice';
import { socketPort } from '../config';
import io from 'socket.io-client';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});
export const socket = io(socketPort);

export type SocketType = ReturnType<typeof io>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
