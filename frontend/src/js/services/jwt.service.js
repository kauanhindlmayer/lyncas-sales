export const setToken = (token) => {
  localStorage.setItem("lyncas-sales-token", token);
};

export const setUsername = (username) => {
  localStorage.setItem("lyncas-sales-username", username);
};

export const getToken = () => {
  return localStorage.getItem("lyncas-sales-token");
};

export const getUsername = () => {
  return localStorage.getItem("lyncas-sales-username");
};

export const removeToken = () => {
  localStorage.removeItem("lyncas-sales-token");
};

export const removeUsername = () => {
  localStorage.removeItem("lyncas-sales-username");
};
