import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTtile] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isLoading, setIsLoading] = useState(false);
  const navigater = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsLoading(true);
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify(blog),
    }).then(() => {
      //console.log("New Blog added");
      setIsLoading(false);
      navigater(-1);
      //history.push('/');
    });
  };

  return (
    <div className="create">
      <h1>
        Add a <span className="title-highlighter">New </span>Blog
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="blogtitle">Blog title:</label>
        <input
          type="text"
          name="blogtitle"
          id="blogtitle"
          value={title}
          onChange={(e) => setTtile(e.target.value)}
          required
        />
        <label htmlFor="blogbody">Blog body:</label>
        <textarea
          name="blogbody"
          id="blogbody"
          cols="15"
          rows="5"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        <label htmlFor="blogauthor">Blog author:</label>
        <select
          name="blogauthor"
          id="blogauthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="Mario">Mario</option>
          <option value="Teja">Teja</option>
        </select>
        <div className="button-center">
          {!isLoading && (
            <button className="btn-submit" type="submit">
              Add Blog
            </button>
          )}
          {isLoading && (
            <button className="btn-submit" type="submit" disabled>
              Adding
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
