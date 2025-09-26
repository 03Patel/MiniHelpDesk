import axios from "axios";

const API = axios.create({
  baseURL: "https://minibackend-t51q.onrender.com/api/", // backend URL
});

export default API;
