import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, isLoading, error} = useFetch('http://localhost:8000/blogs/' + id);
    const navigater = useNavigate()

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            navigater(-1);
        })
    }

    return ( 
        <div className="blog-details">
            <h1><span className="title-highlighter">Blog</span> Details</h1>
            { isLoading && <div> Loading ....</div>}
            { error && <div> {error} </div>}
            { blog && (
                <div className="blog-preview">
                    <h2 className="blog-title"> {blog.title} </h2>
                    <p className="blog-content"> {blog.body} </p>
                    <p className="blog-author-box"> written by - <span className="blog-author"> {blog.author} </span>  </p>
                    <button className="btn-delete" onClick={handleClick}>Delete</button>
                </div>                
            )}
        </div>
     );
}
 
export default BlogDetails;