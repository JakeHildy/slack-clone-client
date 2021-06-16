export const checkIfLoggedIn = () => {
  const token = sessionStorage.getItem("authToken");
  console.log(!!token);
  return true;
};
