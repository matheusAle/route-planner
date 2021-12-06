import { configureStore } from '@reduxjs/toolkit';
import { placesSlice } from './placesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    places: placesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export * as Places from './placesSlice';
