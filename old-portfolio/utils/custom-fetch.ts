import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
});
