import apiService from 'services/api';

export function fetchPosts() {
  return apiService.fetchPosts();
}

export function translatePosts(languageFrom, languageTo, posts) {
  return apiService.translatePosts(languageFrom, languageTo, posts);
};

export function translatePost(languageFrom, languageTo, post) {
  return apiService.translatePost(languageFrom, languageTo, post.title, post.body);
};
