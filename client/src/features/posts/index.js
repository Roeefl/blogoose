import postsReducer, {
  selectPosts,
  deletePost,
  ratePost,
  fetchPostsAsync,
  addPostTranslations,
  translatePostAsync,
  translatePostsAsync,
} from './postsSlice';

export {
  postsReducer,
  selectPosts,
  deletePost,
  ratePost,
  fetchPostsAsync as fetchPosts,
  addPostTranslations,
  translatePostAsync,
  translatePostsAsync,
};
