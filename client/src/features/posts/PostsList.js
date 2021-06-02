import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'evergreen-ui';
import { selectLanguage } from 'features/language';
import { deletePost, ratePost } from 'features/posts';
import { selectIsLoading, selectPosts } from './postsSlice';
import Post from './Post';
import List from 'components/List';
import styles from './PostsList.module.scss';

export default function PostsList() {
  const dispatch = useDispatch();

  const currentLanguage = useSelector(selectLanguage);
  const isLoadingPosts = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);

  const onDeletePost = (postKey) => dispatch(deletePost(postKey));
  const onRatePost = (postKey, value) => dispatch(ratePost({ postKey, value }));

  const postsArray = Object.entries(posts).map(([key, post]) => ({
    ...post,
    key
  }));

  return (
    <div className={styles.container}>
      {isLoadingPosts &&
        <div className={styles.loading}>
          <Spinner size={160} />
        </div>
      }
      {!isLoadingPosts &&
        <List height={700} rowHeight={140} items={postsArray} renderItem={(post) => (
          <Post
            key={post.key}
            language={currentLanguage.key} 
            post={post}
            onDelete={() => onDeletePost(post.key)} 
            onRate={(value) => onRatePost(post.key, value)}
          />
        )} />
      }
    </div>
  );
}
