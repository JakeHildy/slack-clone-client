import axios from "axios";
const BACKEND = process.env.REACT_APP_BACKEND_URL;
const USERS_EP = process.env.REACT_APP_USERS_EP;
const PATH = `${BACKEND}${USERS_EP}`;

export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(PATH);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const getUser = (id, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${PATH}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      resolve(response.data.user);
    } catch (err) {
      reject(err);
    }
  });
};

export const getUserPublic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${PATH}/public/${id}`);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(PATH, userData);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${PATH}/login`, { email, password });
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const updateUserConfig = (username, avatarConfig) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(
        `${PATH}/${sessionStorage.getItem("userId")}`,
        { username, avatarConfig }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
