import { useNavigate } from "react-router-dom";
const { DateTime } = require("luxon");

function Blog({ blog, user, handleDelete }) {
  let navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/${blog._id}`);
  };

  // const handleDelete =  (id) => {
  //   fetch(`/api/blogs/${id}/delete`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //add authorization header with 'bearer' + token here
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.log("Error:", error);
  //     });
  // }

  return (
    <div>
      <div
        className="card mb-3 bg-secondary border border-primary"
        key={blog._id}
      >
        <img src="" className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title text-light">{blog.title}</h5>
          <p className="card-text">{blog.blog}</p>
          <p className="text-light mb-0">{blog.author.username}</p>
          <p>
            {DateTime.fromISO(blog.date).toLocaleString(DateTime.DATETIME_MED)}
          </p>
          <button
            onClick={handleEdit}
            className="btn btn-warning btn-sm me-2"
            hidden={user ? false : true}
          >
            Edit
          </button>
          <button
            onClick={handleEdit}
            className="btn btn-warning btn-sm"
            hidden={blog.published === true && user ? false : true}
          >
            Unpublish
          </button>
          <button
            onClick={handleEdit}
            className="btn btn-success btn-sm"
            hidden={blog.published === false && user ? false : true}
          >
            Publish
          </button>

          <button
            onClick={() => handleDelete(blog._id)}
            className="btn btn-danger float-end btn-sm"
            hidden={user ? false : true}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
