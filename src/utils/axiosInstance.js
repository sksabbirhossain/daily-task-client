import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://daily-task-server-two.vercel.app/api";

const headers = {
  "content-Type": "application/json",
  Accept: "application/json",
};

//creating an axios instance
export const axiosInstance = axios.create({
  baseURL,
  headers,
});