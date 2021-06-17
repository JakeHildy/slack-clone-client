import axios from "axios";

export const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://192.168.1.72:9000/api/v1/users");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const createUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://192.168.1.72:9000/api/v1/users",
        userData
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const loginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://192.168.1.72:9000/api/v1/users/login",
        { email, password }
      );
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
