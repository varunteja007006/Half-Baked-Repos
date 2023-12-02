import Bloglist from "./Bloglist";
import useFetch from "./useFetch";

const Home = () => {

    const {data : blogs, isLoading, error} = useFetch('http://localhost:8000/blogs')

    const title = "All Blogs";
    const mytitle = "Mario's Blogs";

    return ( 
        <div className="home">
        <h1>Home</h1>
            { isLoading && <button className="btn-delete" type="">Loading...please wait</button>} 
            { error && <button className="btn-delete" type="">{error}</button>} 
            {blogs && <Bloglist blogs={blogs} title = {title}> </Bloglist>} 
            {blogs && <Bloglist blogs={blogs.filter((blog) => blog.author === 'mario')} title = {mytitle} > </Bloglist>} 
        </div> 
     );
 
}
 
export default Home;