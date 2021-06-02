import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, translatePosts, translatePost } from './postsAPI';

const initialState = {
  isLoading: false,
  posts: {},
};

export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPostsAsync',
  async () => {
    const posts = await fetchPosts();
    return posts;
  },
);

export const translatePostsAsync = createAsyncThunk(
  'posts/translatePostsAsync',
  async ({ languageFrom, languageTo, posts = [] }) => {
    const translatedPosts = await translatePosts(languageFrom, languageTo, posts);

    return {
      translatedPosts
    };
  },
);

export const addPostTranslations = createAsyncThunk(
  'posts/addPostTranslations',
  async ({ languageFrom, languageTo, postKey, post }) => {
    if (post.translations[languageTo]) {
      return {};
    }
    
    const translations = await translatePost(languageFrom, languageTo, post);

    return {
      postKey,
      languageTo,
      translations,
    };
  },
);

export const translatePostAsync = createAsyncThunk(
  'posts/translatePostAsync',
  async ({ languageFrom, languageTo, postKey, post }) => {
    const translations = await translatePost(languageFrom, languageTo, post);

    return {
      postKey,
      languageTo,
      translations,
    };
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost: (state, { payload: postKey }) => {
      delete state.posts[postKey];
    },
    ratePost: (state, { payload }) => {
      const { postKey, value } = payload;
      state.posts[postKey].rating += value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, { payload: posts }) => {
        state.isLoading = false;
        state.posts = posts;
      })
      .addCase(addPostTranslations.fulfilled, (state, { payload }) => {
        const {
          postKey,
          languageTo,
          translations,
        } = payload;

        if (!translations || !translations.length) return;

        const currentPost = state.posts[postKey];

        const [currentTranslation] = translations;
        const { title, body } = currentTranslation;

        state.posts[postKey] = {
          ...currentPost,
          translations: {
            ...currentPost.translations,
            [languageTo]: {
              title,
              body,
            },
          },
        }
      })
      .addCase(translatePostsAsync.fulfilled, (state, { payload }) => {
        const { translatedPosts } = payload;

        translatedPosts.forEach((translatedPost, index) => {
          const currentPost = state.posts[index];

          state.posts[index] = {
            ...currentPost,
            translations: {
              ...currentPost.translations,
              [translatedPost.languageTo]: {
                title: translatedPost.title,
                body: translatedPost.body,
              },
            },
          }
        })
      })
  },
});

export const { deletePost, ratePost } = postsSlice.actions;

export const selectIsLoading = (state) => state.posts.isLoading;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
