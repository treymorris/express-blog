import { useState } from "react";

function BlogForm() {
  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/blogs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        blog,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div>
      <h1 className="text-light mb-3">Create a new Blog!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-light">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="blogTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="blog" className="form-label text-light">
            Blog It!
          </label>
          <textarea
            name="blog"
            className="form-control"
            id="blogText"
            rows="3"
            onChange={(e) => setBlog(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
