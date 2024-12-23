import axios from "axios";

// Base API URL
const API_URL = "https://strapi.covrzy.com/";

// Bearer token for authorization
const AUTH_TOKEN = "Bearer a40b9a746ebc42303552a67b246a46d2fa22e62a10c0da14318f6757f3de8ab4608068d919282ea560ea2ae12d6aa6cd33bba299d3cb434e59a3326b6b0e0a4cd40ef5a6c5f190772640e4c8ab21a81b1c2e0d3a96c4185f2844e15f1cda953b97c0fb685f69677185cce0005657e427d7c55512147febc43f2434c06bd15827";

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
