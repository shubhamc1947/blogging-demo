import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/blogServices";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        if (id) getBlogById(id).then(setBlog);
    }, [id]);

    return (
        <div style={{ padding: "1rem" }}>
            {blog ? (
                <>
                    <h1>{blog.title}</h1>
                    <p>{blog.content}</p>
                </>
            ) : (
                <p>Loading blog details...</p>
            )}
        </div>
    );
};

export default BlogDetails;
