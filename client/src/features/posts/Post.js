import { useDispatch, useSelector } from 'react-redux'; 
import PropTypes from 'prop-types';
import { TranslateIcon } from 'evergreen-ui';
import { selectPreviousLanguage, selectLanguage } from 'features/language';
import { translatePostAsync } from 'features/posts';
import { LANGUAGE_OPTIONS, DEFAULT_LANGUAGE_KEY } from 'utils/languages';
import Button from 'components/Button';
import styles from './Post.module.scss';

const Post = ({ index, language, post }) => {
  const {
    id,
    userId,
    date,
    translations = {},
    title,
    body,
  } = post;

  const dispatch = useDispatch();

  const previousLanguage = useSelector(selectPreviousLanguage);
  const currentLanguage = useSelector(selectLanguage);

  const currentTranslation = translations[language] || {};

  const onTranslateClick = () => dispatch(
    translatePostAsync({
      languageFrom: previousLanguage.key,
      languageTo: currentLanguage.key,
      postIndex: index,
      post,
    })
  );

  return (
    <div className={styles.post}>
      <div className={styles.content}>
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
      <Button appearance="primary" size="medium" iconBefore={TranslateIcon} padding={16} onClick={onTranslateClick}>
        Translate Me
      </Button>
    </div>
  );
}

Post.propTypes = {
  index: PropTypes.number.isRequired,
  language: PropTypes.string,
  post: PropTypes.object,
};

Post.defaultProps = {
  language: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE_KEY].key,
  post: {},
};

export default Post;
