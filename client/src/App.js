import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';
import { selectLanguage, setLanguage } from 'features/language';
import { selectPosts, fetchPosts, addPostTranslations } from 'features/posts';
import PostsList from 'features/posts/PostsList';
import Select from 'components/Select';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  const currentLanguage = useSelector(selectLanguage);
  const posts = useSelector(selectPosts);

  useEffect(
    () => dispatch(fetchPosts()),
    []
  );

  useEffect(() => {
    Object
      .entries(posts)
      .forEach(([postKey, post]) => {
        dispatch(addPostTranslations({
          postKey,
          languageFrom: DEFAULT_LANGUAGE_KEY,
          languageTo: currentLanguage.key,
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
