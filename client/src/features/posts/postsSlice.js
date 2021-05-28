import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, translatePost } from './postsAPI';

const initialState = {
  isLoading: false,
  posts: [],
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPostsAsync',
  async () => {
    const posts = await fetchPosts();
    return posts;
  },
);

export const addTranslationsAsync = createAsyncThunk(
  'posts/addTranslationsAsync',
  async ({ languageFrom, languageTo, post, postIndex }) => {
    const translations = await translatePost(languageFrom, languageTo, post);

    return {
      postIndex,
      languageTo,
      translations,
    };
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, { payload: posts }) => {
        state.isLoading = false;
        state.posts = posts;
      })
      .addCase(addTranslationsAsync.fulfilled, (state, { payload }) => {
        const {
          postIndex,
          languageTo,
          translations,
        } = payload;

        if (!translations || !translations.length) return;

        const currentPost = state.posts[postIndex];

        const [currentTranslation] = translations;
        const { text } = currentTranslation;

        const [title, body] = text.split('|||');

        state.posts[postIndex] = {
          ...currentPost,
          translations: {
            ...currentPost.translations,
            [languageTo]: {
              title,
              body,
            },
          },
        }
      });
  },
});

// export const { increment, decrement, incrementByAmount } = postsSlice.actions;

export const selectIsLoading = (state) => state.posts.isLoading;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
