// import axios from "axios"

// // const BASE_URL = "http://localhost:8000/api/v1"
// import {BASE_URL} from "../Constants.js"

// const axiosInstance =  axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;

// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;




// import axios from "axios";
// import {BASE_URL} from "../Constants.js"

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

// export default axiosInstance;




import axios from 'axios';

// Use environment variables for the base URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = apiBaseUrl;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
