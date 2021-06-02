import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';
import { selectLanguage, setLanguage } from 'features/language';
import { selectPosts, fetchPosts, addPostTranslations } from 'features/posts';
import PostsList from 'features/posts/PostsList';
import Select from 'components/Select';
import logo from 'assets/logo.png';
import styles from './App.module.scss';

export default function App() {
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
        <h1 className={styles.title}>
          <span className={styles.logo}>
            <img src={logo} alt="App Logo" className={styles.image}/>
          </span>
          Blogoose
        </h1>
        <h6 className={styles.devNote}>
          (It's a stupid wordplay with Suridata; Since mongoose and suricata can be considered similar animals)
        </h6>
      </header>
      <div className={styles.content}>
        <main className={styles.postsList}>
          <PostsList />
        </main>
        <aside className={styles.sidebar}>
          <Select
            label="Select Translation Language:"
            options={Object.values(LANGUAGE_OPTIONS)}
            selection={currentLanguage}
            onChange={(selectedKey) => dispatch(setLanguage(selectedKey))}
          />
        </aside>
      </div>
    </div>
  );
}
