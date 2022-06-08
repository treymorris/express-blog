//import { useState } from "react";
import { useNavigate } from "react-router-dom";


function BlogForm({ blog, setBlog, handleSubmitCreate }) {

  // const [blog, setBlog] = useState({
  //   title: "",
  //   blog: "",
  //   published: false
  // });
  
  let navigate = useNavigate();
  
  // const handleSubmitCreate = (e) => {
  //   e.preventDefault();

  //   fetch("/api/blogs/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //add authorization header with 'bearer' + token here
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify({
  //       title: blog.title,
  //       blog: blog.blog,
  //       published: false,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevInfo) => {
      return { ...prevInfo, [name]: value };
    });
  };
  


  return (
    <div>
      <h1 className="text-light mb-3 text-center">Create a new Blog!</h1>
      <form onSubmit={handleSubmitCreate}>
        <div className="mb-3 w-50 mx-auto">
          <label htmlFor="title" className="form-label text-light">
            Title
          </label>
          <input
            name="title"
            //value={blog.title || ""}
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
            //value={blog.blog || ""}
            name="blog"
            className="form-control"
            id="blogText"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={()=>{handleSubmitCreate(); navigate('/')}}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
