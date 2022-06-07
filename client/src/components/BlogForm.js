import { useEffect, useState } from "react";
//import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

function BlogForm() {
  const [blog, setBlog] = useState({
    title: '',
    blog: '',
    published: false,
    comments: ''
  });
  //const [title, setTitle] = useState("");
  let navigate = useNavigate();
  //const { id } = useParams();

  // useEffect(() => {
  //   fetchBlog();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  // const fetchBlog = async () => {
  //   const data = await fetch(`api/blogs/${id}`);
  //   const blog = await data.json();
  //   setBlog(blog.blog)
  // }

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
        title: blog.title,
        blog: blog.blog,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };

  return (
    <div>
      <h1 className="text-light mb-3 text-center">Create a new Blog!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="title" className="form-label text-light">
            Title
          </label>
          <input
            name="title"
            value={blog.title || ''}
            type="text"
            className="form-control"
            id="blogTitle"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="blog" className="form-label text-light">
            Blog It!
          </label>
          <textarea
            value={blog.blog || ''}
            name="blog"
            className="form-control"
            id="blogText"
            rows="3"
            onChange={handleChange}
          ></textarea>
          {/* <Editor
            apiKey="b0mjjk7m4kelpn5ihyocsnucb1xiawd6ri14iudjok255h5e"
            plugins="wordcount"
            onChange={(e) => setBlog(e.target.value)}
            id="blogText"
            name="blog"
          /> */}
        </div>
        <div className="d-flex justify-content-center mb-5">
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
