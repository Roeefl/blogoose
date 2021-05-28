import React from 'react';
import { useSelector } from 'react-redux';
import { selectLanguage } from 'features/language';
import { selectIsLoading, selectPosts } from './postsSlice';
import Post from './Post';
import styles from './PostsList.module.scss';

function PostsList() {
  const currentLanguage = useSelector(selectLanguage);

  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post.id} className={styles.post}>
            <Post language={currentLanguage.key} post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
