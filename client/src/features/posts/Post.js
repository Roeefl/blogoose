import PropTypes from 'prop-types';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';
import styles from './Post.module.scss';

const Post = ({ language, post }) => {
  const {
    id,
    userId,
    date,
    translations = {},
    title,
    body,
  } = post;

  const currentTranslation = translations[language] || {};

  return (
    <div className={styles.post}>
      <h3 className={styles.title}>
        {currentTranslation.title || title}
      </h3>
      <h4 className={styles.date}>
        {date}
      </h4>
      <p className={styles.body}>
        {currentTranslation.body || body}
      </p>
    </div>
  );
}

Post.propTypes = {
  language: PropTypes.string,
  post: PropTypes.object,
};

Post.defaultProps = {
  language: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE_KEY].key,
  post: {},
};

export default Post;
