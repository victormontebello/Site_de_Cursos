import axios from "axios";

import { getAPIBackendUrl } from "../config";

const api = axios.create({
  baseURL: getAPIBackendUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
