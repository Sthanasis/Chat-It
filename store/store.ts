import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chatSlice';

import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    chatState: chatReducer,
    userState: userReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
