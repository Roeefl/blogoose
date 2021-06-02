import postsReducer, {
  selectPosts,
  deletePost,
  ratePost,
  fetchPostsAsync,
  addPostTranslations,
  translatePostAsync,
} from './postsSlice';

export {
  postsReducer,
  selectPosts,
  deletePost,
  ratePost,
  fetchPostsAsync as fetchPosts,
  addPostTranslations,
  translatePostAsync,
};
