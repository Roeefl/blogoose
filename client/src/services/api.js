import axios from 'axios';

const apiURL = 'http://localhost:1337';

class ApiService {
  static async fetchPosts() {
    const url = `${apiURL}/posts`;

    try {
      const { data = {} } = await axios.get(url);
      const { posts = {} } = data;

      return posts;
    } catch (err) {
      console.error(err);
    }
  }

  static async translatePost(languageFrom, languageTo, title, body) {
    const url = `${apiURL}/translate-post`;

    try {
      const { data = {} } = await axios.get(
        url, {
          params: {
            languageFrom,
            languageTo,
            title,
            body,
          },
        },
      );

      const { translations = [] } = data;
      return translations;
    } catch (err) {
      console.error(err);
    }
  }

  static async translatePosts(languageFrom, languageTo, posts) {
    const url = `${apiURL}/translate-posts`;

    try {
      const { data = {} } = await axios.post(
        url, {
          languageFrom,
          languageTo,
          posts
        }
      );

      const { translatedPosts = [] } = data;
      console.log("🚀 ~ file: api.js ~ line 32 ~ ApiService ~ translatePosts ~ translatedPosts", translatedPosts)
      return translatedPosts;
    } catch (err) {
      console.error(err);
    }
  }
}

export default ApiService;
