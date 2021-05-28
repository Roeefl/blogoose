import apiService from 'services/api';

export function fetchPosts() {
  return apiService.fetchPosts();
}

export function translatePost(languageFrom, languageTo, post) {
  return apiService.translatePost(languageFrom, languageTo, post.title, post.body);
};
