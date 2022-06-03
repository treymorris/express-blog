const { DateTime } = require("luxon");

function Blog({ blog, user }) {
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
          <p>
            {DateTime.fromISO(blog.date).toLocaleString(DateTime.DATETIME_MED)}
          </p>
          <a
            href="/edit"
            className="link-warning nav-link"
            hidden={user ? false : true}
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

export default Blog;
