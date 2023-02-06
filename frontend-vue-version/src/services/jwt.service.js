const USER_TOKEN = "lyncas-sales-token";
const getToken = () => localStorage.getItem(USER_TOKEN);
const setToken = (token) => localStorage.setItem(USER_TOKEN, token);
const removeToken = () => localStorage.removeItem(USER_TOKEN);

const USER_NAME = "lyncas-sales-username";
const getUsername = () => localStorage.getItem(USER_NAME);
const setUsername = (username) => localStorage.setItem(USER_NAME, username);
const removeUsername = () => localStorage.removeItem(USER_NAME);

export default {
  getToken,
  setToken,
  removeToken,
  getUsername,
  setUsername,
  removeUsername,
};
