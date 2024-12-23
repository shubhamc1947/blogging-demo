import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/blogServices";

const Blogs = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Blogs</h1>
            {blogs.length ? (
                <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", listStyle: "none" }}>
                    {blogs.map((blog) => (
                        <li key={blog.id} style={{ width: "200px", padding: "1rem", borderRadius: "5px", border: "2px solid #333", color: "black", cursor: "pointer" }}>
                            <Link to={`/blog/${blog.documentId}`}>{blog.title}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading blogs...</p>
            )}
        </div>
    );
};

export default Blogs;
