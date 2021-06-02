const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

const randomDate = (start = new Date(2020, 1, 1), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const AZURE_KEY_1 = '89095120895743dab13fe065e823c677';
const AZURE_KEY_2 = '2deaac61d33d465d8004d629a3555ba3';
const ENDPOINT = 'https://api.cognitive.microsofttranslator.com/';

const LOCATION = 'westeurope';

const SEPARATOR = '|||';
const API_VERSION = '3.0';

router.get('/', (req, res) => {
  res.send('Server Homepage');
});

router.get('/posts', async (req, res) => {
  const apiURL = 'https://jsonplaceholder.typicode.com';
  const url = `${apiURL}/posts`;

  try {
    const { data } = await axios.get(url);

    const posts = data.reduce((acc, post) => {
      const { id } = post;
      const postId = `post${id}`;

      return {
        ...acc,
        [postId]: {
          ...post,
          date: randomDate().toString(),
          rating: 0,
          translations: {
            default: {
              title: post.title,
              body: post.body,
            },
          },
        }
      };
    }, {});

    res.send({ posts });
  } catch (err) {
    console.error(err);
  }
});

async function translatePost(languageFrom, languageTo, title, body) {
  const data = await axios({
    method: 'post',
    baseURL: ENDPOINT,
    url: '/translate',
    headers: {
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString(),
      'Ocp-Apim-Subscription-Key': AZURE_KEY_1,
      'Ocp-Apim-Subscription-Region': LOCATION,
    },
    params: {
      'api-version': API_VERSION,
      'from': languageFrom ? [languageFrom] : undefined,
      'to': [languageTo],
    },
    data: [{
      text: `${title}${SEPARATOR}${body}`,
    }],
    responseType: 'json'
  }).then(res => res.data);

  const translations = (data[0].translations || [])
    .map(translation => {
      const { text = '' } = translation;
      const [title, body] = text.split(SEPARATOR);

      return {
        to: translation.to,
        title,
        body,
      };
    });

  return translations;
}

router.post('/translate-posts', async (req, res) => {
  const {
    languageFrom,
    languageTo,
    posts = []
  } = req.body;

  if (!languageTo) {
    res
      .status(500)
      .send({ errorMessage: 'Missing languageTo in post body' });

    return;
  }

  const translatedPosts = posts.map(async (post) => {
    const transaltedPost = await translatePost(null, languageTo, post.title, post.body);

    return {
      ...transaltedPost,
      languageTo: translatedPosts.to,
      to: undefined,
    };
  });

  res.send({ translatedPosts });
});

router.get('/translate-post', async (req, res) => {
  const { languageFrom, languageTo, title, body } = req.query;

  if (!title || !body) {
    res
      .status(500)
      .send({ errorMessage: 'Missing text query param for translation' });

    return;
  };

  try {
    const translations = await translatePost(languageFrom, languageTo, title, body);
    res.send({ translations });
  } catch (err) {
    console.error(err);
  }
});

router.get('/detect', async (req, res) => {
  // const response = await axios({
  //   method: 'post',
  //   baseURL: ENDPOINT,
  //   url: '/detect',
  //   headers: {
  //     'Content-type': 'application/json',
  //     'X-ClientTraceId': uuidv4().toString(),
  //     'Ocp-Apim-Subscription-Key': AZURE_KEY_1,
  //     'Ocp-Apim-Subscription-Region': LOCATION,
  //   },
  //   params: {
  //     'api-version': API_VERSION,
  //   },
  //   data: [{
  //     'text': title,
  //   }],
  //   responseType: 'json',
  // });

  // const { data } = response;
  // const [firstResult] = data;
  // const { language, score } = firstResult;
  // console.log("🚀 ~ file: index.js ~ line 48 ~ router.get ~ score", score)
  // console.log("🚀 ~ file: index.js ~ line 48 ~ router.get ~ language", language)
  // res.send({ score, language });
});

module.exports = router;
