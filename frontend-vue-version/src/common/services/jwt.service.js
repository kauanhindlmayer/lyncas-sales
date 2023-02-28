const USER_TOKEN = "lyncas-sales-token";
const getToken = () => localStorage.getItem(USER_TOKEN);
const setToken = (token) => localStorage.setItem(USER_TOKEN, token);
const removeToken = () => localStorage.removeItem(USER_TOKEN);

const USER_NAME = "lyncas-sales-username";
const getUsername = () => localStorage.getItem(USER_NAME);
const setUsername = (username) => localStorage.setItem(USER_NAME, username);
const removeUsername = () => localStorage.removeItem(USER_NAME);

const LOCALE = "lyncas-sales-locale";
const getLocale = () => localStorage.getItem(LOCALE);
const setLocale = (locale) => localStorage.setItem(LOCALE, locale);
const removeLocale = () => localStorage.removeItem(LOCALE);

export default {
  getToken,
  setToken,
  removeToken,
  getUsername,
  setUsername,
  removeUsername,
  getLocale,
  setLocale,
  removeLocale,
};
