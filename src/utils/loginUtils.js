export const isLoggedIn = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) return false;
  // TODO use the token and attempt to login to prove its good.
  return true;
};

export const setSessionStorage = (token, id) => {
  sessionStorage.setItem("authToken", token);
  sessionStorage.setItem("userId", id);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
