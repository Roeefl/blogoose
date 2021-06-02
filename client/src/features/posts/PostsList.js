import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'features/language';
import { deletePost, ratePost } from 'features/posts';
import { selectIsLoading, selectPosts } from './postsSlice';
import Post from './Post';
import List from 'components/List';
import styles from './PostsList.module.scss';

function PostsList() {
  const dispatch = useDispatch();

  const currentLanguage = useSelector(selectLanguage);
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);

  const onDeletePost = (postKey) => dispatch(deletePost(postKey));
  const onRatePost = (postKey, value) => dispatch(ratePost({ postKey, value }));

  const postsArray = Object.entries(posts).map(([key, post]) => ({
    ...post,
    key
  }));

  return (
    <div className={styles.container}>
      <List height={600} rowHeight={120} items={postsArray} renderItem={(post) => (
        <li key={post.key} className={styles.post}>
          <Post
            language={currentLanguage.key} 
            post={post}
            onDelete={() => onDeletePost(post.key)} 
            onRate={(value) => onRatePost(post.key, value)}
          />
        </li>
      )} />
    </div>
  );
}

export default PostsList;
