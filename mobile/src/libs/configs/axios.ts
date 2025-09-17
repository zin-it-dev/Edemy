import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
