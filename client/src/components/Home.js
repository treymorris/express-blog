import Blog from "./Blog";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Home({ blogs, user, handleDelete, fetchBlogs }) {
  //This can be moved to Public Access Website
  //const [published, setPublished] = useState([]);
  //  useEffect(() => {
  //    setPublished(() => blogs.filter((blog) => blog.published));
  //  }, [blogs]);

  const handlePublish = async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}/publish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      console.log("Published", data);
      fetchBlogs();
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleUnpublish = async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}/unpublish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      console.log("Unpublished", data);
      fetchBlogs();
    } catch (error) {
      console.log("Error", error);
    }
  };
  
  
  const handleDeleteComment = (id) => {
  fetch(`/api/comments/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //add authorization header with 'bearer' + token here
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchBlogs();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };


  return (
    <main>
      <section>
        <div className="container-fluid">
          <p className="text-light mb-5 text-center">
            Welcome to Bloggy! Where elite bloggers blog about all the things
            worth blogging about today.
          </p>
        </div>
      </section>
      <h4 className="text-light text-center mb-3">Blogs!</h4>
      <section className="row p-3 pt-1 w-75 mx-auto">
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Blog
              blog={blog}
              user={user}
              handleDelete={handleDelete}
              handlePublish={handlePublish}
              handleUnpublish={handleUnpublish}
            />
            <h6 className="text-light ms-3">Comments</h6>
            {blog.comments.map((comment) => (
              <div key={comment._id}>
                <Comment
                  comment={comment}
                  user={user}
                  handleDeleteComment={handleDeleteComment}
                />
              </div>
            ))}
            <CommentForm
              blogid={blog._id}
              user={user}
              fetchBlogs={fetchBlogs}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
