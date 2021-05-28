import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE_OPTIONS } from 'utils/languages';
import { selectPreviousLanguage, selectLanguage, setLanguage } from 'features/language';
import { selectPosts, fetchPostsAsync, addTranslationsAsync } from 'features/posts';
import PostsList from 'features/posts/PostsList';
import Select from 'components/Select';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  const previousLanguage = useSelector(selectPreviousLanguage);
  const currentLanguage = useSelector(selectLanguage);
  const posts = useSelector(selectPosts);

  useEffect(
    () => dispatch(fetchPostsAsync()),
    []
  );

  useEffect(() => {
    posts.forEach((post, index) => {
      dispatch(addTranslationsAsync({
        languageFrom: previousLanguage.key,
        languageTo: currentLanguage.key,
        postIndex: index,
        post,
      }));
    });
  }, [currentLanguage]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>
          Blogoose
        </h1>
      </header>
      <div className={styles.content}>
        <main className={styles.postsList}>
          <PostsList />
        </main>
        <aside className={styles.sidebar}>
          <Select
            label="Select Language:"
            options={Object.values(LANGUAGE_OPTIONS)}
            selection={currentLanguage}
            onChange={(selectedKey) => dispatch(setLanguage(selectedKey))}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
