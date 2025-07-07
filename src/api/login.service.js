import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const loginWithGoogle = async (idToken) => {
  const response = await axios.post(`${API_URL}/google`, { idToken });
  return response.data;
};
