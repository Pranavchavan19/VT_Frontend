// import axios from "axios"

// // const BASE_URL = "http://localhost:8000/api/v1"
// import {BASE_URL} from "../Constants.js"

// const axiosInstance =  axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;

// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;

import axios from "axios";
import {BASE_URL} from "../Constants.js"

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
