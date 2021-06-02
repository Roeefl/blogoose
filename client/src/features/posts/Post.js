import PropTypes from 'prop-types';
import { DeleteIcon, ThumbsUpIcon, ThumbsDownIcon } from 'evergreen-ui';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';
import IconButton from 'components/IconButton';
import styles from './Post.module.scss';

const Post = ({ language, post, onDelete, onRate }) => {
  const {
    id,
    userId,
    date,
    translations = {},
    title,
    body,
    rating,
  } = post;

  const currentTranslation = translations[language] || {};

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <IconButton appearance="minimal" size="large" iconBefore={DeleteIcon} onClick={onDelete} />
      </div>
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
      <div className={styles.rate}>
        <IconButton appearance="minimal" size="large" iconBefore={ThumbsUpIcon} onClick={() => onRate(1)} />
        <span className={styles.rating}>
          {rating || 0}
        </span>
        <IconButton appearance="minimal" size="large" iconBefore={ThumbsDownIcon} onClick={() => onRate(-1)} />
      </div>
    </div>
  );
}

Post.propTypes = {
  language: PropTypes.string,
  post: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
};

Post.defaultProps = {
  language: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE_KEY].key,
  post: {},
};

export default Post;
