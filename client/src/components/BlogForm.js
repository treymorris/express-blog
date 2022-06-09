import { useNavigate } from "react-router-dom";

function BlogForm({ setBlog, handleSubmitCreate }) {
  let navigate = useNavigate();

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
            onClick={() => {
              handleSubmitCreate();
              navigate("/");
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
