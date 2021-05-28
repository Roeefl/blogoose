import { configureStore } from '@reduxjs/toolkit';
import { languageReducer } from 'features/language';
import { postsReducer } from 'features/posts';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    posts: postsReducer,
  },
});
