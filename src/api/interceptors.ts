import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_OPEN_WEATHER_MAP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClassic = axios.create(options);

axiosClassic.interceptors.request.use((config) => {
  const appid = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;

  if (!config.params) {
    config.params = {};
  }

  // Adding appid param
  config.params.appid = appid;

  return config;
});

export { axiosClassic };
