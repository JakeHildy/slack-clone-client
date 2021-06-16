export const isLoggedIn = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) return false;
  // TODO use the token and attempt to login to prove its good.
  return true;
};
