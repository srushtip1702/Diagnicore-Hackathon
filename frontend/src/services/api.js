import axios from "axios";

const API = axios.create({
  baseURL: "https://gracious-art-production-efa5.up.railway.app/"
});

export default API;