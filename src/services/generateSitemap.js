import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SitemapStream, streamToPromise } from "sitemap";

// Constants for API
const API_URL = "https://strapi.covrzy.com/";
const AUTH_TOKEN = "Bearer a40b9a746ebc42303552a67b246a46d2fa22e62a10c0da14318f6757f3de8ab4608068d919282ea560ea2ae12d6aa6cd33bba299d3cb434e59a3326b6b0e0a4cd40ef5a6c5f190772640e4c8ab21a81b1c2e0d3a96c4185f2844e15f1cda953b97c0fb685f69677185cce0005657e427d7c55512147febc43f2434c06bd15827";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
  },
});

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  try {
    const hostname = "https://covrzy.com"; // Your domain name
    const smStream = new SitemapStream({ hostname });

    // Add the static routes
    const staticRoutes = [
      { url: "/", priority: 1.0 },
      { url: "/about", priority: 0.9 },
    ];

    staticRoutes.forEach((route) => {
      smStream.write({ url: route.url, priority: route.priority });
    });

    // Fetch routes from Strapi
    const strapiRoutesResponse = await axiosInstance.get(
      "api/blogpages?populate=*&sort[0]=date:desc"
    );
    const strapiRoutes = strapiRoutesResponse.data.data.map(
      (blog) => `/blog/${blog.slug}`
    );
    strapiRoutes.forEach((route) => {
      smStream.write({ url: route, priority: 0.7 });
    });

    smStream.end();
    const sitemap = await streamToPromise(smStream).then((data) =>
      data.toString()
    );

    // Write the sitemap to the build folder
    const buildFolderPath = path.join(__dirname, "../../", "dist");
    console.log(buildFolderPath);
    if (!fs.existsSync(buildFolderPath)) {
      console.error("Build folder not found. Please build your app first.");
      return;
    }
    fs.writeFileSync(path.join(buildFolderPath, "sitemap.xml"), sitemap, "utf-8");
    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

generateSitemap();
