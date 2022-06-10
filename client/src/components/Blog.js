import { useNavigate } from "react-router-dom";
const { DateTime } = require("luxon");

function Blog({ blog, user, handleDelete, handleUnpublish, handlePublish }) {
  let navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/${blog._id}`);
  };

  function createMarkup() {
    return { __html: blog.blog };
  }

  return (
    <div>
      <h5 className="text-light ms-3">Blog</h5>
      <div className="card mb-3 mt-3 bg-secondary border border-primary">
        <img src="" className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title text-dark">{blog.title}</h5>
          <p className="card-text" dangerouslySetInnerHTML={createMarkup()}></p>
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
            onClick={() => handleUnpublish(blog._id)}
            className="btn btn-warning btn-sm"
            hidden={blog.published === true && user ? false : true}
          >
            Unpublish
          </button>
          <button
            onClick={() => handlePublish(blog._id)}
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
