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

router.get('/translate', async (req, res) => {
  const { languageFrom, languageTo, title, body } = req.query;

  if (!title || !body) {
    res
      .status(500)
      .send({ errorMessage: 'Missing text query param for translation' });
  };

  try {
    const data = await axios({
      method: 'post',
      baseURL: ENDPOINT,
      url: '/translate',
      // url: '/transliterate',
      headers: {
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
        'Ocp-Apim-Subscription-Key': AZURE_KEY_1,
        'Ocp-Apim-Subscription-Region': LOCATION,
      },
      params: {
        'api-version': '3.0',
        'from': 'en',
        'to': ['de'],
        // 'language': 'he',
        // 'from': 'Latn',
        // 'to': 'Hebr',
      },
      data: [{
        text: `${title} ||| ${body}`,
      }],
      responseType: 'json'
    }).then(res => res.data);

    const translations = data[0].translations || [];
    res.send({ translations });
  } catch (err) {
    console.error(err);
  }
});

router.get('/posts', async (req, res) => {
  const apiURL = 'https://jsonplaceholder.typicode.com';
  const url = `${apiURL}/posts`;

  try {
    const { data } = await axios.get(url);

    const posts = data.map(post => ({
      ...post,
      date: randomDate().toString(),
      translations: {
        fr: {
          title: post.title,
          body: post.body,
        },
      },
    }));

    res.send({ posts });
  } catch (err) {
    console.error(err);
  }
});

router.get('/', (req, res) => {
  res.send('Server Homepage');
});

module.exports = router;
