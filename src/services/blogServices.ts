import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL;

// Bearer token for authorization
const AUTH_TOKEN = import.meta.env.AUTH_TOKEN;

// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
});

// Fetch all blogs with populated fields and sorted by date (descending)
export const getBlogs = async () => {
  try {
    const { data } = await axiosInstance.get("api/blogpages?populate=*&sort[0]=date:desc");
    console.log(data.data)
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs.");
  }
};

// Fetch a single blog by ID with its attributes
export const getBlogById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`api/blogpages/${id}?populate=*`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    throw new Error("Failed to fetch blog details.");
  }
};
