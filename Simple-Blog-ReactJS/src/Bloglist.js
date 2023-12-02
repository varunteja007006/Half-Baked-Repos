import { Link } from "react-router-dom";

const Bloglist = ({blogs, title}) => {
//const Bloglist = ({blogs, title, handleDelete}) => {

    //const blogs = props.blog;
    //const title = props.title;
    //console.log(blogs); 

    return ( 
        <div className="blogs">
            <h2> {title} </h2>
            {blogs.map((blog) => (
                
            <div className="blog-preview" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    <h2 className="blog-title"> {blog.title} </h2>
                </Link>    
                    <p className="blog-content"> {blog.body} </p>
                    <p className="blog-author-box"> written by - <span className="blog-author"> {blog.author} </span>  </p>
            </div>
            ))}   
        </div>
     );
//     return ( 
//        <div className="blogs">
//            <h2> {title} </h2>
//            {blogs.map((blog) => (
//            <div className="blog-preview" key={blog.id}>
//                <h2 className="blog-title"> {blog.title} </h2>
//                <p className="blog-content"> {blog.body} </p>
//                <p className="blog-author-box"> written by - <span className="blog-author"> {blog.author} </span>  </p>
//                <button className="btn-delete" onClick={() => handleDelete(blog.id)}><i class="fas fa-trash"></i></button>
//            </div>
//            ))}   
//        </div>
//     );
    }
 
export default Bloglist;